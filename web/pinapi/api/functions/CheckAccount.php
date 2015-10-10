<?php

class CheckAccount {

    function __construct($watchtoken) {
        $this->watchtoken = $watchtoken;
    }

    function execute() {
        $db = DataBase::getInstance();
        $count = $db->select("SELECT COUNT(*) FROM Users where User_Token=?", [$this->watchtoken]);
        return ['AccountExists'=>$count[0][0] > 0];

    }
}