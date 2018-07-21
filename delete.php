<?php
    // Require source files (not needed if you use composer)
    require 'crunchDB/src/crunchDB.php';
    require 'crunchDB/src/crunchTable.php';
    require 'crunchDB/src/crunchResource.php';
    // Alias class accessor to omit namespace (optional)
    use cybrox\crunchdb\CrunchDB as CrunchDB;
    // Creating new cdb instance

    $dbdir = "WebGL Models/".urldecode($_POST["modelFolder"])."/db/";
    if (!file_exists($dbdir)) {
        return;
    }
    $cdb = new CrunchDB($dbdir);

    if(!$cdb->table('variants')->exists()) {
        return;
    }
    $cdb->table('variants')->select(["name", "==", $_POST["name"]])->delete();
    echo "deleted";
?>