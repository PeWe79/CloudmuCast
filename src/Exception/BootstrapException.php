<?php

declare(strict_types=1);

namespace App\Exception;

use App\Exception;
use Monolog\Level;
use Throwable;

final class BootstrapException extends Exception
{
    public function __construct(
        string $message = '',
        int $code = 0,
        Throwable $previous = null,
        Level $loggerLevel = Level::Alert
    ) {
        parent::__construct($message, $code, $previous, $loggerLevel);
    }
}
