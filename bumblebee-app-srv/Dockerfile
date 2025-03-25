# Use official Node.js image
FROM node:22-bullseye

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Compile TypeScript
RUN npx tsc

# Expose Fastify's port
EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]
