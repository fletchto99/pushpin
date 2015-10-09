<?php

class CheckAccount {

    function __construct($watchtoken) {
        $this->watchtoken = $watchtoken;
    }

    function execute() {
        return ['AccountExists' => 'true'];
    }
}