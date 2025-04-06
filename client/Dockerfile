FROM node:18.9.0

# Create app directory inside the container

WORKDIR /app 

# copy app dependencies from package.json and package-lock.json

COPY package*.json ./

# Install app dependencies

RUN npm install

# Copy app source code to the container

COPY . .


# Build the app

RUN npm run build

# Expose the port the app runs on

EXPOSE 3000

# Start the app
CMD ["npm", "start"]






