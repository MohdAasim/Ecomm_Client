# Use an official Node.js image as a base image for development
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port 4173 (default Vite dev server port)
EXPOSE 4173

# Start Vite in development mode
CMD ["npm", "run", "dev"]
