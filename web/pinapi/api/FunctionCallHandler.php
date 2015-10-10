<?php

require_once 'functions/CheckAccount.php';
require_once 'functions/CreateAccount.php';

class FunctionCallHandler {

    private $result = ['error' => 'Invalid function call.'];

    function execute($method, $params) {
        switch ($method) {
            case 'check_account':
                $checkaccount = new CheckAccount($params['watchtoken']);
                $this->result = $checkaccount->execute();
                break;
            case 'create_account':
                $createAccount = new CreateAccount($params['username'], $params['password'], $params['watchtoken']);
                $this->result = $createAccount->execute();
                break;
        }
        echo json_encode($this->result);
    }

}