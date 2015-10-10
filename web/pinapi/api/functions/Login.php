<?php

class Login {

    function __construct($username, $password) {
        $this->username = $username;
        $this->password = sha1($password);
    }

    function execute() {
        if (!isset($this->username) || strlen($this->username) < 1 | !isset($this->password) || strlen($this->password) < 1) {
            return ['Error' => 'invalid_input'];
        }
        $db = DataBase::getInstance();
        try {
            $result = $db->select("SELECT User_Token FROM Users WHERE Username = ? AND Password = ?", [$this->username, $this->password]);
            if (!isset($result[0]['User_Token'])) {
                return ['Login'=>false];
            }
            $_SESSION['watchtoken'] = $result[0]['User_Token'];
            return ['Login'=>true];
        } catch(Exception $e) {
            return ['Login'=>false];
        }

    }
}