# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /frontend

# Copy package.json and lock files first (to optimize caching)
COPY package.json yarn.lock ./

# Enable Corepack (so we don’t need to install Yarn globally)
RUN corepack enable

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY public/ public
COPY src/ src

# Expose frontend port
EXPOSE 3000

# Start the React app in development mode
CMD ["yarn", "start"]
