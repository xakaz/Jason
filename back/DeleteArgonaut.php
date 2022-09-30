<?php
require_once './ConfigDatabase/MySQL.php';

function deleteArgonaut()
{
    try {

        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Method: POST, GET, OPTIONS, PUT, DELETE");
        header("Content-Type: application/json");

        $data = json_decode(file_get_contents('php://input'));

        if (isset($data->id)) {
            $id = $data->id;
            $req = "DELETE FROM argonauts where id = :id";
            $stmt = getBdd()->prepare($req);
            $stmt->bindValue(':id', $id, PDO::PARAM_STR);
            $stmt->execute();
            $stmt->closeCursor();
        } else {
            throw new Exception("L'argonaute n'a pas pu être supprimé'");
        }
    } catch (Exception $e) {
        $msg = $e->getMessage();
        echo $msg;
    }
}


deleteArgonaut();
