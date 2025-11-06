# Etapa 1: Construir a aplicação
FROM node:22

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto para o container
#COPY package.json package-lock.json ./
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos da aplicação
#COPY . /app
COPY . .


# Expor a porta 80
EXPOSE 5173

# Comando para iniciar o Nginx
CMD ["npm", "run", "dev"]
