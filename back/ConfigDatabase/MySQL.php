<?php

function getBdd()
{
  $user = 'root';
  $pass = 'root';
  $db = 'mysql:host=localhost;dbname=jason';

  try {
    $pdo = new PDO($db, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    return $pdo;
  } catch (Exception $e) {

    echo "Impossible d'accéder à la base de données : " . $e->getMessage();
    die();
  }
}
