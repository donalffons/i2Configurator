cd /var/www/html/

# disable errors
exec 3>&2
exec 2> /dev/null

mv "i2configurator/WebGL Models" "./WebGL Models"
rm ./i2configurator/* -f -R
mv "./WebGL Models" "./i2configurator/WebGL Models"

# re-enable errors
exec 2>&3