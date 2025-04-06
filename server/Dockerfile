FROM  node:18.9.1

# Create app directory inside the container

WORKDIR /app

# copy app dependencies from package.json and package-lock.json

COPY package*.json ./

# Install app dependencies

RUN npm install

# Copy app source code to the container

COPY . .

# Expose the port the app runs on

EXPOSE 5001

# Use a script to control seeding

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]  
