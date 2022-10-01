<?php
require_once './credentials.php';

function getBdd()
{
  try {
    if ($_SERVER['HTTP_HOST'] === "localhost") {
    $pdo = new PDO(PDO_LOCALHOST_CONNEXION, USER_LOCALHOST, PASSWORD_LOCALHOST, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    } else {
    $pdo = new PDO(PDO_SERVER_CONNEXION, USER_SERVER, PASSWORD_SERVER, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    }
    return $pdo;
  } catch (Exception $e) {

    echo "Impossible d'accéder à la base de données : " . $e->getMessage();
    die();
  }
}
