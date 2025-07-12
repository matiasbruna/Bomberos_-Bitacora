#!/bin/bash
# Restaura el backup desde la carpeta ./backup_local a la base local MongoDB

if [ -d "./backup_local/test" ]; then
  echo "♻️ Restaurando backup desde ./backup_local/test a MongoDB local..."
  mongorestore --uri="mongodb://127.0.0.1:27017/test" ./backup_local/test
  echo "✅ Restauración completada"
else
  echo "❌ Error: No se encontró la carpeta ./backup_local/test"
fi
