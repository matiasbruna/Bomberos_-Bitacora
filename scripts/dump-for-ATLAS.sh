#!/bin/bash


echo "Realizando backup desde MongoDB Atlas..."
mongodump --uri="mongodb+srv://matiasbdev:rxjeQQvoPWSTigeZ@bvsf.9vfczge.mongodb.net/BVSF" --out=./backup

echo "✅ Backup completo en ./backup"
