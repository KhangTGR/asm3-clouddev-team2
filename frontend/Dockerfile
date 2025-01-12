# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the Angular development server port
EXPOSE 4200

# Start the Angular development server
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
