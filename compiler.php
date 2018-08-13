<?php

chdir("i2ConfiguratorExplorer/");

include("compiler.php");
chdir("../");

copy("i2ConfiguratorExplorer/ifm.php", "explorer.php");

?>