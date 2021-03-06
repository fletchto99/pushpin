<?php

class CreateAccount {

    function __construct($username, $password, $watchtoken) {
        $this->username = $username;
        $this->password = $password;
        $this->watchtoken = $watchtoken;
    }

    function execute() {
        if (!isset($this->username) || strlen($this->username) < 1 | !isset($this->password) || strlen($this->password) < 1 || !isset($this->watchtoken) || strlen($this->watchtoken) < 1) {
            return ['Error' => 'invalid_input'];
        }
        $db = DataBase::getInstance();
        try {
            $db->insert("INSERT INTO Users(Username, Password, User_Token) values (?,?,?)", [$this->username, sha1($this->password), $this->watchtoken]);
            Functions::pushWelcomePin($this->watchtoken, $this->username);
            return ['AccountCreated'=>true];
        } catch(Exception $e) {
           return ['Error' => 'account_exists'];
        }

    }
}