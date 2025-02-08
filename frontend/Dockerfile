# Use Node.js official image
FROM node:20

# Set working directory inside the container
WORKDIR /frontend

# Copy package.json and yarn.lock first (dependency caching optimization)
COPY package.json yarn.lock ./

# Enable Corepack for Yarn (no need to install it manually)
RUN corepack enable

# Install dependencies (optimized)
RUN yarn install --frozen-lockfile

# Copy the rest of the frontend code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the React app in development mode
CMD ["yarn", "start"]
