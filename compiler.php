<?php

echo getcwd() . "<br/>";
chdir("I2ConfiguratorExplorer/");

include("compiler.php");
chdir("../");

copy("I2ConfiguratorExplorer/ifm.php", "explorer.php");

?>