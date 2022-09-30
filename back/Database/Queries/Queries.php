<?php

class Queries extends MySQL
{
    public function getDatabaseArgonauts(): array
    {
        $req = "SELECT * FROM argonauts";
        $stmt = $this->getBdd()->prepare($req);
        $stmt->execute();
        $argonauts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt->closeCursor();
        return $$argonauts;
    }

    public function setDatabaseArgonaut($name)
    {
        if (self::getDatabaseArgonaut($name)) {
            return false;
        } else {
            $req = "INSERT INTO argonauts (name) VALUES (:name)";
            $stmt = $this->getBdd()->prepare($req);
            $stmt->bindValue(":name", $name, PDO::PARAM_STR);
            $stmt->execute();
            $stmt->closeCursor();
        }
    }

    public function deleteDatabaseArgonaut($id)
    {
        $req = "DELETE FROM argonauts where id = :id";
        $stmt = $this->getBdd()->prepare($req);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $stmt->closeCursor();
    }

    private function getDatabaseArgonaut($name)
    {
        $req = 'SELECT * FROM argonauts WHERE name = :name';
        $stmt = $this->getBdd()->prepare($req);
        $stmt->bindValue(':name', $name, PDO::PARAM_STR);
        $stmt->execute();
        $argonaut = $stmt->fetch(PDO::FETCH_ASSOC);
        $stmt->closeCursor();
        return $argonaut['name'];
    }
}
