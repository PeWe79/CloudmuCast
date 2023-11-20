<?php

declare(strict_types=1);

namespace App\Notification\Check;

use App\Container\EnvironmentAwareTrait;
use App\Entity\Api\Notification;
use App\Event\GetNotifications;
use App\Exception\RateLimitExceededException;
use App\Session\FlashLevels;

final class DonateAdvisorCheck
{
    use EnvironmentAwareTrait;

    public function __invoke(GetNotifications $event): void
    {
        $request = $event->getRequest();

        $rateLimit = $request->getRateLimit();
        try {
            $rateLimit->checkRequestRateLimit($request, 'notification:donate', 600, 1);
        } catch (RateLimitExceededException) {
            return;
        }

        $notification = new Notification();
        $notification->title = __('CloudmuCast is free and open-source software.');
        $notification->body = __(
            'If you are enjoying CloudmuCast, please consider donating to support our work. We depend ' .
            'on donations to build new features, fix bugs, and keep CloudmuCast modern, accessible and free.',
        );
        $notification->type = FlashLevels::Info->value;

        $notification->actionLabel = __('Donate to CloudmuCast');
        $notification->actionUrl = 'https://donate.azuracast.com/';

        $event->addNotification($notification);
    }
}
