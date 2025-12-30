# Stage 1: Build the Next.js static site
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first → better caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the project
COPY . .

# Build → creates the /out folder thanks to output: 'export' in next.config.js
RUN npm run build

# Stage 2: Final minimal production image with Nginx
FROM nginx:alpine

# Remove default nginx files (optional but cleans up)
RUN rm -rf /usr/share/nginx/html/*

# Copy ONLY the static Next.js output from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Copy our custom nginx config (create this file too!)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (Nginx default)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]