<?php

declare(strict_types=1);

namespace App\Controller\Api\Admin\StereoTool;

use App\Controller\SingleActionInterface;
use App\Entity\Api\Status;
use App\Http\Response;
use App\Http\ServerRequest;
use App\Radio\StereoTool;
use App\Service\Flow;
use App\Utilities\File;
use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Process\Process;

final class PostAction implements SingleActionInterface
{
    public function __invoke(
        ServerRequest $request,
        Response $response,
        array $params
    ): ResponseInterface {
        $flowResponse = Flow::process($request, $response);
        if ($flowResponse instanceof ResponseInterface) {
            return $flowResponse;
        }

        $fsUtils = new Filesystem();

        $sourceTempPath = $flowResponse->getUploadedPath();

        $libraryPath = StereoTool::getLibraryPath();

        File::clearDirectoryContents($libraryPath);

        if ('zip' === pathinfo($flowResponse->getClientFilename(), PATHINFO_EXTENSION)) {
            $destTempPath = sys_get_temp_dir() . '/uploads/new_stereo_tool';
            $fsUtils->remove($destTempPath);
            $fsUtils->mkdir($destTempPath);

            $process = new Process([
                'unzip',
                '-o',
                $sourceTempPath,
            ]);
            $process->setWorkingDirectory($destTempPath);
            $process->setTimeout(600.0);

            $process->run();

            $flowResponse->delete();

            $pluginDirs = glob($destTempPath . '/Stereo_Tool_Generic_plugin_*') ?: [];
            if (count($pluginDirs) > 0) {
                $pluginDir = $pluginDirs[0];
                $versionStr = str_replace($destTempPath . '/Stereo_Tool_Generic_plugin_', '', $pluginDir);

                $filesToCopy = glob($pluginDir . '/libStereoTool*.so') ?: [];

                foreach ($filesToCopy as $fileToCopy) {
                    $fsUtils->rename(
                        $fileToCopy,
                        $libraryPath . '/' . basename($fileToCopy),
                        true
                    );
                }

                $fsUtils->dumpFile(
                    $libraryPath . '/' . StereoTool::VERSION_FILE,
                    substr($versionStr, 0, 2) . '.' . substr($versionStr, 2),
                );
            } else {
                throw new InvalidArgumentException('Uploaded file not recognized.');
            }

            $fsUtils->remove($destTempPath);
        } else {
            $binaryPath = $libraryPath . '/stereo_tool';
            $flowResponse->moveTo($libraryPath);

            chmod($binaryPath, 0744);
        }

        return $response->withJson(Status::success());
    }
}
