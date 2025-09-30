#!/bin/bash

CONTAINER_NAME="orion-postgres"
DB_USER="orion_user"
DB_NAME="orion_db"
DUMP_FILE="orion_db_dump.sql"


echo "Subindo container do banco..."
docker-compose up -d

echo "Esperando o banco ficar disponível..."
for i in {1..30}
do
  docker exec $CONTAINER_NAME pg_isready -U $DB_USER > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "Banco está pronto!"
    break
  fi
  sleep 1
done

if [ $? -ne 0 ]; then
  echo "Timeout esperando o banco."
  exit 1
fi

# 3. Copiar o dump para dentro do container
echo "Copiando dump para dentro do container..."
docker cp $DUMP_FILE $CONTAINER_NAME:/$DUMP_FILE

# 4. Importar o dump dentro do container
echo "🛠️ Importando dump no banco..."
docker exec -it $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME -f /$DUMP_FILE

if [ $? -eq 0 ]; then
  echo "Banco configurado com sucesso!"
else
  echo "Erro na importação do banco."
fi
