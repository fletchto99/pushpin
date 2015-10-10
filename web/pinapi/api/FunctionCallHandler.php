<?php

require_once 'functions/CheckAccount.php';
require_once 'functions/CreateAccount.php';
require_once 'functions/PushPin.php';
require_once 'functions/Login.php';

class FunctionCallHandler {

    private $result = ['error' => 'Invalid function call.'];

    function execute($method, $params) {
        session_start();
        date_default_timezone_set('UTC');
        switch ($method) {
            case 'check_account':
                $checkaccount = new CheckAccount($params['watchtoken']);
                $this->result = $checkaccount->execute();
                break;
            case 'create_account':
                $createAccount = new CreateAccount($params['username'], $params['password'], $params['watchtoken']);
                $this->result = $createAccount->execute();
                break;
            case 'push_pin':
                if (!isset($_SESSION['watchtoken'])) {
                    $this->result = ['status' => '-1'];
                } else {
                    $pushpin = new PushPin($params['site'], $params['timezone'], $params['data'], $_SESSION['watchtoken']);
                    $this->result=$pushpin->execute();
                }
                break;
            case 'login':
                $login = new Login($params['username'], $params['password']);
                $this->result = $login->execute();
                break;
            case 'logout':
                session_destroy();
                $this->result = ['logout' => true];
                break;
        }
        echo json_encode($this->result);
    }

}