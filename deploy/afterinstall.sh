cd /var/www/html/i2configurator

git clone --recurse-submodules https://github.com/donalffons/i2ConfiguratorExplorer.git --branch master
git clone --recurse-submodules https://github.com/donalffons/i2ConfiguratorCore.git --branch master
git clone --recurse-submodules https://github.com/donalffons/i2ConfiguratorEditorViewer.git --branch master

# disable errors
exec 3>&2
exec 2> /dev/null

# copy configuration file (if exists)
cp /home/ec2-user/i2DatabaseConf.php ./i2ConfiguratorCore/build

# re-enable errors
exec 2>&3

chown apache:apache . -R