<?php

function getBdd()
{
  try {
    $pdo = new PDO("mysql:host=localhost;dbname=jason;charset=utf8", "root", "root", [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    return $pdo;
  } catch (Exception $e) {

    echo "Impossible d'accéder à la base de données : " . $e->getMessage();
    die();
  }
}
