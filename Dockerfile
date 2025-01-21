# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Start the application in production mode
CMD ["yarn", "start"]
