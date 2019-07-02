FROM node:9.4.0  

WORKDIR /app  

COPY package.json /app 
RUN npm install 

COPY ./app .  
