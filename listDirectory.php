<?php
    $dbdir = "WebGL Models/".urldecode($_POST["modelFolder"]);
    $files = array_diff(scandir($dbdir), array('.', '..'));
    echo json_encode(array_values($files));
?>