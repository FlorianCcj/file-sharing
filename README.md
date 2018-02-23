# file-sharing

## Introduction
This project has been created to share big file with other people fastly.

### file-sharing-back
nodejs with express 4.16.2 and multer 1.3.0.

### file-sharing-front
angular 5.2.5

## dev
to work on this project you need node (I use v9.4.0) and npm (use 5.6.0)

### file-sharing-back
 * install: `npm i`
 * start: `npm start`

### file-sharing-front
 * install : `npm i`
 * start: `npm start`

## prod
### file-sharing-back
 * `cd /var/www/file-sharing-code/file-sharing-back`
 * `npm i`
 * `sudo npm i -g pm2`
 * `pm2 app/app.js`
 * config apache: ```
 <VirtualHost *:80>
    ServerName "${APACHE_HOSTNAME}.${APACHE_DOMAINENAME}"
    DocumentRoot /var/www/file-sharing/
    <Directory /var/www/file-sharing>
      RewriteEngine On
      RewriteRule ^/?api/(.*)$ http://127.0.0.1:3003/api/$1 [L,P]
    </Directory>
    ErrorLog ${APACHE_LOG-DIR}/file-sharing.error.log
    CustomLog ${APACHE_LOG-DIR}/file-sharing.acces.log combined
 </VirtualHost>
 ```

### file-sharing-front
 * `cd /var/www/file-sharing-code/file-sharing-front`
 * `npm i`
 * `npm run build`
 * `cp -r dist/* /var/www/file-sharing`

## Todo
 * dockerize front for prod
 * dockerize back for dev
 * dockerize back for prod

## Resources
Inspiration:
 * https://medium.com/@ahmedhamedTN/multiple-files-upload-with-angular-2-express-and-multer-1d951a32a1b3
 * https://github.com/Waxo (file-sharing-view and file-sharing-server)
