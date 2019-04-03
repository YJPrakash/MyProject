
## cache clean 
$ sync; echo 1 > /proc/sys/vm/drop_caches
$ sync; echo 2 > /proc/sys/vm/drop_caches
$ sync; echo 3 > /proc/sys/vm/drop_caches

## Clean update archives
$ apt-get clean
$ apt-get autoclean

## Dependency failure reslove
$ apt-get -f install

## unnedded packages remove
$ apt-get autoremove

## Disk defragment 
$ e4defrag /dev/sda2

## disk error check in initramfs
$ fsck /dev/sda2

## make filesystem
$ mkfs.ntfs /dev/sdb

## apt get install dependency error in status file
$ cp /var/lib/dpkg/status-old /var/lib/dpkg/status
$ apt-get update


## add user from commandline and Change the user as sudo user
$ usermod -a -G sudo <username>

## change the permission frim user Group to push cit commits 
$ sudo chown -R jeya:laxtest /home/laxtest/lakshmirepo/
$ sudo chown -R jeya:jefftest /home/jefftest/jeffrinrepo/
$ sudo chown -R jeya:malatest /home/malatest/malarepo/


## apahce configuration with acces permission 
$ groupadd apache
$ sudo groupadd apache
$ sudo useradd apache -g apache -d /dev/null/ -s /sbin/nologin
$ sudo cp /etc/apache2/apache2.conf /etc/apache2/apache2.conf.bak
$ sudo nano /etc/apache2/apache2.conf
$ sudo /etc/init.d/apache2 restart
$ sudo adduser prismdata
$ sudo usermod -a -G apache prismdata 
$ sudo chown -R prismdata:apache /var/prism/data/
$ sudo chown -R prismdata:apache /home/infant/heartlywork/Install/FE_Source/
$ sudo find /var/prism/data -type d -exec chmod 700 {} \;
$ sudo find /var/prism/data -type f -exec chmod 600 {} \;


$ sudo chown -R apache:apache /var/myproj/www/
$ sudo chmod -R 775 /var/myproj/www/


## create ssh login key gen
$ ssh-keygen -t rsa -b 2048
$ ssh-copy-id user@hostname
$ ssh user@hostname


## create custom profiles and open as startup terminal
$ gnome-terminal --tab-with-profile="<ProFILE_NAME>" --title="Tab_Name" --working-directory="<...>"


## create a new branch with tagName
$ git checkout -b <new branch Name> <tag Name>

## Removing remote branches in Repo.
$ git remote remove <origin name>

## help for git remote info
$ git remote rename origin old-origin
$ git remote add origin <remoteurl>

## deb package repack command.
$ apt-get install dpkg-repack
$ dpkg-repack iptux

## List the process with memory usage in top utility
$ top (while running top press 'E'- to change Memory usage by MB. or KB.)

## Replicate in couchdb
$ curl -X POST http://admin:root@127.0.0.1:5984/_replicate -d '{"source":"https://skimdb.npmjs.com/registry", "target":"registry", "continuous":true}' -H "Content-Type: application/json"


## MongoImport commands using uri string 
$ mongoimport --uri mongodb+srv://jeya:jeya@cluster0-sgqbf.gcp.mongodb.net/ff-bible --collection booksList --type json --file ./booksList.json


## uninstall system apps without root 
$ pm list packages | grep <NAME_OF_PACKAGE>
$ pm uninstall -k --user 0 <NAME_OF_PACKAGE>

$ adb shell cmd package install-existing <NAME_OF_PACKAGE>


## open chrome browser window with specific profile 
$ google-chrome --profile-directory=<YOUR_PROFILE_NAME>

### then create the desktop shortcut named as <Filename>.descktop
#!/usr/bin/env xdg-open

[Desktop Entry]
Version=1.0
Type=Application
Terminal=false
Exec=google-chrome --profile-directory=Default
Name=Chrome-Default
Icon=google-chrome
Name[en_IN]=Filename

## create PDF from chrome headless
google-chrome --headless --disable-gpu --print-to-pdf=<FILE_NAME>

## Adb command for backup the system apk
for i in $(adb shell pm list packages -f -s | cut -d= -f 1 | cut -d ":" -f 2); do adb pull $i; done

## Adb Command For backup the user apps 
for package in $(adb shell pm list packages -3 | tr -d '\r' | sed 's/package://g'); do apk=$(adb shell pm path $package | tr -d '\r' | sed 's/package://g'); echo "Pulling $apk"; adb pull -p $apk "$package".apk; done
