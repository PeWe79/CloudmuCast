<?php

declare(strict_types=1);

namespace App\VueComponent;

use App\Http\ServerRequest;
use App\Service\HpNp;

final class NowPlayingComponent implements VueComponentInterface
{
    public function __construct(
        private readonly HpNp $hpNp
    ) {
    }

    public function getProps(ServerRequest $request): array
    {
        $customization = $request->getCustomization();

        $station = $request->getStation();
        $backendConfig = $station->getBackendConfig();

        return [
            ...$this->getDataProps($request),
            'showAlbumArt' => !$customization->hideAlbumArt(),
            'autoplay' => !empty($request->getQueryParam('autoplay')),
            'showHls' => $backendConfig->getHlsEnableOnPublicPlayer(),
            'hlsIsDefault' => $backendConfig->getHlsIsDefault(),
        ];
    }

    public function getDataProps(ServerRequest $request): array
    {
        $station = $request->getStation();
        $customization = $request->getCustomization();

        return [
            'stationShortName' => $station->getShortName(),
            'useStatic' => $customization->useStaticNowPlaying(),
            'useSse' => $customization->useStaticNowPlaying() && $this->hpNp->isSupported(),
        ];
    }
}
