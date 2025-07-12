#!/bin/bash
// hace backup de la base local para poder subir al repositorio y trabajar con ella.

echo "Realizando backup desde MongoDB Atlas..."
mongodump --uri="mongodb://127.0.0.1:27017/test" --out=./backup_local

echo "✅ Backup completo en ./backup_local"