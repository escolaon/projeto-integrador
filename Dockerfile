# Use a specific version of Node.js
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# This allows Docker to cache the npm install step if these files haven't changed
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma client and migrate the database
RUN npm run db

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
