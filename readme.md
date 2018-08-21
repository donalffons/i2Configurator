# I2 Configurator

[![Build Status](https://travis-ci.org/donalffons/i2Configurator.svg?branch=master)](https://travis-ci.org/donalffons/i2Configurator)

Uploader and configurator for 3D models for the web.
More info coming soon...

[Test environment](https://interactiveimpressions.com/i2configurator/explorer.php). Feel free to mess around with it!

## Sub-Projects:

* Core & Database Functionality

   [i2ConfiguratorCore](https://github.com/donalffons/i2ConfiguratorCore)

* Model & Variant Explorer Component

   [i2ConfiguratorExplorer](https://github.com/donalffons/i2ConfiguratorExplorer)
 
* Model Editor / Viewer Component
 
   [i2ConfiguratorEditorViewer](https://github.com/donalffons/i2ConfiguratorEditorViewer)

## Installation
This project is using [AWS CodeDeploy](https://aws.amazon.com/de/codedeploy/) for automatic deployment on the production server. The following files are used during deployment:
* ./appspec.yml
* ./deploy/beforeinstall.sh
* ./deploy/afterinstall.sh

### Requirements
* HTTP Server (tested with Apache)
* PHP > 5.6
* MySQL database

This project will automatically generate the *i2configurator* database and all required tables, if they don't exist.

### Configuration
The database connection information have to be edited in the database configuration script in ./i2database-conf.php.

If the database configuration script is present in the folder /home/ec2-user/, it will be copied and overwrites the default one.
