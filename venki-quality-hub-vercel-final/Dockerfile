# syntax=docker/dockerfile:1.6

FROM node:20-alpine AS build
WORKDIR /app

# Copy dependency manifests and install cleanly
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application source
COPY . .

# Allow the Gemini API key to be provided at build time (optional)
ARG VITE_GEMINI_API_KEY=""
ENV VITE_GEMINI_API_KEY=${VITE_GEMINI_API_KEY}

# Build the production bundle
RUN npm run build

# Serve the compiled assets with Nginx
FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 80

# Health-check friendly default command
CMD ["nginx", "-g", "daemon off;"]
