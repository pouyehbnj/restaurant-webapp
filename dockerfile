# Node as parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Make port available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NODE_ENV production

# Run the app when the container launches
CMD ["node", "server.js"]
