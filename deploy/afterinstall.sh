cd /var/www/html/i2configurator

git clone https://github.com/mrdoob/three.js.git --branch master
git clone https://github.com/donalffons/I2Configurator-Explorer.git --branch master
git clone https://github.com/donalffons/i2ConfiguratorCore.git --branch master

# disable errors
exec 3>&2
exec 2> /dev/null

# copy configuration file (if exists)
cp /home/ec2-user/i2database-conf.php ./i2configurator

# re-enable errors
exec 2>&3

chown apache:apache . -R