FROM node:18
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose the port
EXPOSE 3000

# Important: Change the working directory to src before running
WORKDIR /usr/src/app/src
CMD ["node", "server.js"]