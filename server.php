
RewriteBase /
RewriteCond %{THE_REQUEST} ^[A-Z]{3,9}\ /([^.]+)\.html\ HTTP
RewriteRule ^([^.]+)\.html$ /$1 [R=301,L]
RewriteCond %{REQUEST_URI} !(\.[^./]+)$
RewriteCond %{REQUEST_fileNAME} !-d
RewriteCond %{REQUEST_fileNAME} !-f
RewriteRule (.*) /$1.html