# Project Setup Guide

This README provides instructions for setting up and running the project using either Docker with Docker Compose or direct npm commands.

## Option 1: Running with Docker and Docker Compose

### Prerequisites
- Docker and Docker Compose installed on your machine

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/sikorski1/esatto-task.git
   cd esatto-task
   ```

2. **Create a `.env.local` file or copy paste given .env**
   
   Create a `.env.local` file in the root directory with the necessary environment variables:
   ```
   MONGODB_URI=database-url
   NEXT_PUBLIC_API_URL=localhost
   API_NINJAS_KEY=ninjas-api-key
   ```
   

4. **Build and run the container**
   ```bash
   docker-compose up --build
   ```
   
   This will:
   - Build the Docker image
   - Start the container in detached mode
   - Make the project accessible on the specified port (check `docker-compose.yml` for port mappings)

5. **Access the application**
   
   Navigate to `http://localhost:PORT` in your browser (where `PORT` is defined in the `docker-compose.yml` file)

## Option 2: Running with npm

### Prerequisites
- Node.js and npm installed on your machine

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/sikorski1/esatto-task.git
   cd esatto-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env.local` file or copy paste given .env**
   
   Create a `.env` file in the root directory with the necessary environment variables:
   ```
   MONGODB_URI=database-url
   NEXT_PUBLIC_API_URL=localhost
   API_NINJAS_KEY=ninjas-api-key
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the application**
   ```bash
   npm start
   ```
   
   The application will be accessible at `http://localhost:3000` (or the port specified in your `.env` file)
