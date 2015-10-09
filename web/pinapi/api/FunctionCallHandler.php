<?php

require_once 'functions/CheckAccount.php';

class FunctionCallHandler {

    private $result = ['error' => 'Invalid function call.'];

    function execute($method, $params) {
        switch ($method) {
            case 'check_account':
                $checkaccount = new CheckAccount($params['watchtoken']);
                $this->result = $checkaccount->execute();
                break;
        }
        echo json_encode($this->result);
    }

}