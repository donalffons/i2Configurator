<?php

chdir("I2Configurator-Explorer/");

include("compiler.php");
chdir("../");

copy("I2Configurator-Explorer/ifm.php", "explorer.php");

?>