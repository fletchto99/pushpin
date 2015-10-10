<?php

class PushPin {

    function __construct($site, $pindata, $watchtoken) {
        $this->site = $site;
        $this->data = $pindata;
        $this->watchtoken = $watchtoken;
    }

    function execute() {
        $pins = json_decode($this->data, true);
        if(is_array($pins)) {
            foreach($pins as $pin) {
                $pin['id'] = $this->site . '-' . $pin['id'];
                Functions::pushRawPin($this->watchtoken, $pin);
            }
            return ['multiple' => true];
        } else {
            $pins['id'] = $this->site . '-' . $pins['id'];
            return Functions::pushRawPin($this->watchtoken, $pins);
        }
    }
}