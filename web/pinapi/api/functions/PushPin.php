<?php

use TimelineAPI\PinNotification;
use TimelineAPI\PinLayout;
use TimelineAPI\PinLayoutType;
use TimelineAPI\PinIcon;

class PushPin {

    function __construct($site, $timezone, $pindata, $watchtoken) {
        $this->site = $site;
        $this->data = $pindata;
        $this->watchtoken = $watchtoken;
        $this->timezone = $timezone;
    }

    function execute() {
        $pins = json_decode($this->data, true);
        $notifLayout = new PinLayout(PinLayoutType::GENERIC_NOTIFICATION, 'Pushpin', null, null, 'Your pins from ' . $this->site . ' have been added.', PinIcon::NOTIFICATION_FLAG);
        $notificationData = new PinNotification($notifLayout);
        if(is_array($pins)) {
            $result = 200;
            $added = false;
            foreach($pins as $pin) {
                $pin['id'] = $this->site . '-' . $pin['id'];
                if (!$added) {
                    $pin['createNotification'] = $notificationData->getData();
                    $added=true;
                }
                $datetime = DateTime::createFromFormat('Y-m-d\TH:i:s\Z', $pin['time']);
                $offset = new DateInterval('PT'.$this->timezone.'M');
                $datetime = date_add($datetime, $offset);
                $pin['time'] = $datetime->format('Y-m-d\TH:i:s\Z');
                $res = Functions::pushRawPin($this->watchtoken, $pin);
                if ($res['status']['code'] != 200) {
                    $result = $res['status']['code'];
                }
            }
            return ['status' => $result];
        } else {
            $pins['id'] = $this->site . '-' . $pins['id'];
            $pins['createNotification'] = $notificationData->getData();
            $result = Functions::pushRawPin($this->watchtoken, $pins);
            return ['status'=>$result['status']['code']];
        }
    }
}