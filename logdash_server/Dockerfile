FROM node:18-alpine3.18

# Create app directory
WORKDIR /usr/app

# Install app dependecies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .