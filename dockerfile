# Etapa 1: Construir a aplicação
FROM node:25

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto para o container
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . /app


# Expor a porta 80
EXPOSE 5173

# Comando para iniciar o Nginx
CMD ["npm", "run", "dev"]
