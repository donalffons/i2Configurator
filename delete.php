<?php
    require __DIR__.'/crunchdb/src/crunchDB.php';
    require __DIR__.'/crunchdb/src/crunchTable.php';
    require __DIR__.'/crunchdb/src/crunchResource.php';
    use cybrox\crunchdb\CrunchDB as CrunchDB;

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