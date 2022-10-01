<?php

require_once './ConfigDatabase/MySQL.php';

function sendJSON($info)
{
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    echo json_encode($info);
}

function getArgonauts()
{
    $req = "SELECT * FROM argonauts";
    $stmt = getBdd()->prepare($req);
    $stmt->execute();
    $argonauts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt->closeCursor();
    if ($argonauts) {
        return sendJSON($argonauts);
    } else {
        echo "Impossible de récupérer les argonautes";
    }
}

getArgonauts();
