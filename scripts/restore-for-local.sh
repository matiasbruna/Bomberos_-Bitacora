#!/bin/bash

echo "Restaurando la base de datos en MongoDB local..."

mongorestore --db=test ./backup/test

echo "✅ Restauración completa en MongoDB local"
