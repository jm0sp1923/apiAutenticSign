# Usar una imagen base con Node.js (para Express) y Python (para ejecutar archivos .py)
FROM node:18-slim

# Instalar LibreOffice
RUN apt-get update && apt-get install -y \
    libreoffice
 
# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Instalar las dependencias de Node.js
RUN npm install

# Configurar el PATH para que el contenedor use el entorno virtual de Python
ENV PATH="/app/venv/bin:$PATH"

# Exponer el puerto en el que el servidor Express escuchará
EXPOSE 3000

# Comando por defecto para ejecutar tu servidor Express
CMD ["npm", "start"]
