<?php

if(isset($_POST["api"])) {
    $conn = new mysqli("localhost", "root", "", "i2configurator");
    $conn->set_charset("utf8");
    header("Content-type: text/html;charset=utf-8");
    if ($conn->connect_error) {
        error_log("Connection failed: " . $conn->connect_error);
    }
    
    if($_POST["api"] == "getModelByPath") {
        if(!isset($_POST["path"])) {
            error_log("no path specified");
        }
        
        $result = $conn->query("SELECT * FROM i2models WHERE path = '" . $_POST["path"] . "'");
        if ($result->num_rows == 0) {
            echo json_encode("");
            exit();
        }
		$models = $result->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($models[0]);
    }
    if($_POST["api"] == "getVariantsByPath") {
        if(!isset($_POST["path"])) {
            error_log("no path specified");
        }
        
        $result = $conn->query("SELECT * FROM i2models WHERE path = '" . $_POST["path"] . "'");
        error_log("SELECT * FROM i2models WHERE path = '" . $_POST["path"] . "'");
        if ($result->num_rows == 0) {
            echo json_encode("");
            exit();
        }
		$modelid = $result->fetch_object()->id;
		$result = $conn->query("SELECT * FROM i2variants WHERE `id model` = " . $modelid);
		$variants = $result->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($variants);
    }
    if($_POST["api"] == "getVariantByID") {
        if(!isset($_POST["variantid"])) {
            error_log("no variantid specified");
        }
        
        $result = $conn->query("SELECT * FROM i2variants WHERE id = " . $_POST["variantid"]);
        $variants = $result->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($variants[0]);
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

        if(!isset($_POST["action"])) {
            $_POST["action"] = $variants[0]["action"];
        }
        if(!isset($_POST["name"])) {
            $_POST["name"] = $variants[0]["name"];
        }
        
        $result = $conn->query("INSERT INTO `i2variants` (`id`, `id model`, `action`, `name`) VALUES (" . $variants[0]["id"] . ", '" . $variants[0]["id model"] . "', '" . $_POST["action"] . "', '" . $variants[0]["name"] . "') ON DUPLICATE KEY UPDATE action='" . $_POST["action"] . "', name='" . $_POST["name"] . "'");
        
        echo json_encode("success");
    }
    if($_POST["api"] == "newVariant") {
        if(!isset($_POST["action"]) || !isset($_POST["name"]) || !isset($_POST["modelid"])) {
            error_log("no action or name or model id specified");
        }
        $result = $conn->query("INSERT INTO `i2variants` (`id`, `id model`, `action`, `name`) VALUES (NULL, '" . $_POST["modelid"] . "', '" . $_POST["action"] . "', '" . $_POST["name"] . "')");

        echo json_encode($conn->insert_id);
    }
    if($_POST["api"] == "deleteVariantByID") {
        if(!isset($_POST["variantid"])) {
            error_log("no variant id specified");
        }

        foreach($_POST["variantid"] as $variant) {
            $result = $conn->query("DELETE FROM `i2variants` WHERE id=" . $variant);
        }

        echo json_encode("success");
    }
    if($_POST["api"] == "duplicateVariants") {
        if(!isset($_POST["variantid"])) {
            error_log("no variant id specified");
        }

        foreach($_POST["variantid"] as $variant) {
            $result = $conn->query("SELECT * FROM i2variants WHERE id = " . $variant);
            $template = $result->fetch_all(MYSQLI_ASSOC)[0];
            $result = $conn->query("INSERT INTO `i2variants` (`id`, `id model`, `action`, `name`) VALUES (NULL, '" . $template["id model"] . "', '" . $template["action"] . "', '". $_POST["prefix"] . $template["name"] . $_POST["postfix"] . "')");
        }

        echo json_encode("success");
    }

    $conn->close();
} else {
    die("no api specified.");
}

?>