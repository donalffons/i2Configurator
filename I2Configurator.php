<?php

if(isset($_POST["api"])) {
    $conn = new mysqli("localhost", "root", "", "i2configurator");
    $conn->set_charset("utf8");
    if ($conn->connect_error) {
        error_log("Connection failed: " . $conn->connect_error);
    }
    
    if($_POST["api"] == "getVariantByID") {
        if(!isset($_POST["variantid"])) {
            error_log("no modelid or variantid specified");
        }
        
        $result = $conn->query("SELECT * FROM i2variants WHERE id = " . $_POST["variantid"]);
        $variants = $result->fetch_all(MYSQLI_ASSOC);
        $variant = $variants[0];
        //$variant["action"] = preg_replace("/(\n[\t ]*)([^\t ]+):/", "$1\"$2\":", $variant["action"]);

        $json = json_encode($variant);
        
        header("Content-type: text/html;charset=utf-8");
        echo $json;
    }
    if($_POST["api"] == "getModelByID") {
        if(!isset($_POST["modelid"])) {
            error_log("no modelid or variantid specified");
        }
        
        $result = $conn->query("SELECT * FROM i2models WHERE id = " . $_POST["modelid"]);
        $models = $result->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($models[0]);
    }
    if($_POST["api"] == "get3DFilesByModelID") {
        if(!isset($_POST["modelid"])) {
            error_log("no modelid or variantid specified");
        }
        
        $result = $conn->query("SELECT * FROM i2models WHERE id = " . $_POST["modelid"]);
        $models = $result->fetch_all(MYSQLI_ASSOC);
        $modeldir = "WebGL Models/".$models[0]["path"];
        $allfiles = array_diff(scandir($modeldir), array('.', '..'));
        $threedfiles = [];
        foreach($allfiles as $file) {
            if(in_array(pathinfo($file, PATHINFO_EXTENSION), ["3ds","amf","awd","babylon","babylonmeshdata","ctm","dae","fbx","glb","gltf","js","json","3geo","3mat","3obj","3scn","kmz","md2","obj","playcanvas","ply","stl","svg","vtk","wrl"])) {
                array_push($threedfiles, $file);
            }
        }
        echo json_encode($threedfiles);
    }
    if($_POST["api"] == "saveVariant") {
        if(!isset($_POST["variantid"])) {
            error_log("no modelid or variantid specified");
        }
        $result = $conn->query("SELECT * FROM i2variants WHERE id = " . $_POST["variantid"]);
        $variants = $result->fetch_all(MYSQLI_ASSOC);
        
        $result = $conn->query("INSERT INTO `i2variants` (`id`, `id model`, `action`, `name`) VALUES (" . $variants[0]["id"] . ", '" . $variants[0]["id model"] . "', '" . $_POST["action"] . "', '" . $variants[0]["id"] . "') ON DUPLICATE KEY UPDATE action='" . $_POST["action"] . "'");
        
        echo json_encode("INSERT INTO `i2variants` (`id`, `id model`, `action`, `name`) VALUES (" . $variants[0]["id"] . ", '" . $variants[0]["id model"] . "', '" . $_POST["action"] . "', '" . $variants[0]["id"] . "') ON DUPLICATE KEY UPDATE action='" . $_POST["action"] . "'");
    }

    $conn->close();
} else {
    die("no api specified.");
}

?>