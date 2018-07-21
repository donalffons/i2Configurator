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
        mkdir($dbdir, 0777, true);
    }
    $cdb = new CrunchDB($dbdir);

    if(!$cdb->table('variants')->exists()) {
        $cdb->table('variants')->create();
        $cdb->table('variants')->insert(array("name" => "name", "filenames" => "[\"filename\"]", "propertyChange" => "propertyChange"));
    }
    $cdb->table('variants')->select(["name", "==", $_POST["name"]])->delete();
    if($_POST["filenames"] === null) {
        $_POST["filenames"] = [];
    }
    if($_POST["propertyChange"] === null) {
        $_POST["propertyChange"] = "[]";
    }
    $cdb->table('variants')->insert(array("name" => $_POST["name"], "filenames" => $_POST["filenames"], "propertyChange" => $_POST["propertyChange"]));

?>