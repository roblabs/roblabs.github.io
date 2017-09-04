file=ciqk2376r000lb9m98hmyzwr7.js

echo 'var STYLE =' > $file
cat style.json | json -0 >> $file
echo ';' >> $file
