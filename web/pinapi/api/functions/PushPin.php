<?php

class PushPin {

    function __construct($site, $timezone, $pindata, $watchtoken) {
        $this->site = $site;
        $this->data = $pindata;
        $this->watchtoken = $watchtoken;
        $this->timezone = $timezone;
    }

    function execute() {
        $pins = json_decode($this->data, true);
        if(is_array($pins)) {
            foreach($pins as $pin) {
                $pin['id'] = $this->site . '-2' . $pin['id'];
                $datetime = DateTime::createFromFormat('Y-m-d\TH:i:s\Z', $pin['time']);
                $offset = new DateInterval('PT'.$this->timezone.'M');
                $datetime = date_add($datetime, $offset);
                $pin['time'] = $datetime->format('Y-m-d\TH:i:s\Z');
                Functions::pushRawPin($this->watchtoken, $pin);
            }
            return ['multiple' => true];
        } else {
            $pins['id'] = $this->site . '-' . $pins['id'];
            return Functions::pushRawPin($this->watchtoken, $pins);
        }
    }
}