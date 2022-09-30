<?php
require_once './ConfigDatabase/MySQL.php';

function setArgonaut()
{
    try {

        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Method: POST, GET, OPTIONS, PUT, DELETE");
        header("Content-Type: application/json");

        $data = json_decode(file_get_contents('php://input'));

        if (isset($data->name)) {
            $name = htmlspecialchars($data->name);
            $req = "INSERT INTO argonauts (name) VALUES (:name)";
            $stmt = getBdd()->prepare($req);
            $stmt->bindValue(":name", $name, PDO::PARAM_STR);
            $stmt->execute();
            $stmt->closeCursor();
        } else {
            throw new Exception("L'argonaute n'a pas pu être ajouté'");
        }
    } catch (Exception $e) {
        $msg = $e->getMessage();
        echo $msg;
    }
}

setArgonaut();
