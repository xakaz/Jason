<?php

require_once '../../../back/Database/Queries/Queries.php';

class ArognautsController
{
  private $queries;

  public function __construct()
  {
    $this->queries = new Queries();
  }


  public function deleteArgonaut()
  {
    try {
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Headers: Accept, Content-type, Content-Length, Accept-Encoding");
      header("Access-Control-Allow-Method: POST, GET, OPTIONS, PUT, DELETE");
      header("Content-Type: application/json");

      $data = json_decode(file_get_contents('php://input'));

      if (isset($data->id)) {

        $id = htmlspecialchars($data->id);

        $this->queries->deleteDatabaseArgonaut($id);

      } else {
        throw new Exception("L'argonaute n'a pas pu être supprimé'");
      }
    } catch (Exception $e) {
      $msg = $e->getMessage();
      echo $msg;
    }
  }
}
