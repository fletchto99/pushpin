<?php

use TimelineAPI\Pin;
use TimelineAPI\PinLayout;
use TimelineAPI\PinLayoutType;
use TimelineAPI\PinIcon;
use TimelineAPI\PinReminder;
use TimelineAPI\Timeline;
use TimelineAPI\PebbleColour;
use TimelineAPI\PinNotification;
use TimelineAPI\PinActionType;
use TimelineAPI\PinAction;

class Functions {

    //Global functions for use throughout the application
    public static function pushWelcomePin($watchtoken, $username) {

        //Layouts
        $createLayout = new PinLayout(PinLayoutType::GENERIC_NOTIFICATION, 'Welcome to PushPin ' .$username, null, null, 'We hope you enjoy pushpin!', PinIcon::NOTIFICATION_FLAG);
        $pinLayout = new PinLayout(PinLayoutType::GENERIC_PIN, 'Pushpin', null, null, $username . ' you have successfully registered for pushpin!', PinIcon::GENERIC_CONFIRMATION, PinIcon::GENERIC_CONFIRMATION, PinIcon:: GENERIC_CONFIRMATION, PebbleColour::WHITE, PebbleColour::ORANGE);

        //Notifications
        $createNotification = new PinNotification($createLayout);

        //Pin
        $pin = new Pin('welcome-'.$watchtoken, new DateTime('now'), $pinLayout, null, $createNotification, null);

        //Push the pin
        Timeline::pushPin($watchtoken, $pin);
    }

}