# Project Setup Guide & Mini Documentation

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
   docker compose up --build
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
   
   Create a `.env.local` file in the root directory with the necessary environment variables:
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

## Mini Documentation

### API Routes

#### Animal
- `GET /api/animal` - Retrieve all animals
- `POST /api/animal` - Create a new animal
- `PUT /api/animal/:id` - Update an animal
- `DELETE /api/animal/:id` - Delete an animal

#### Toy
- `GET /api/toy` - Retrieve all toys

#### Funfact
- `GET /api/funfact` - Retrieve funfact from external api

### General Functionalities

#### Data Management
- CRUD operations for managing animals data
- Pagination, sorting and searching capabilities

#### Monitoring and Logging
- Error tracking

#### Security Features
- Input validation

#### Third-party Integrations
- External API connection

### Database Schema

The application uses MongoDB with Mongoose for data modeling. Here are the main schemas:

#### Animal (Base Schema)
- Base schema for all animal types
- Contains: 
  - _id: ObjectId (String)
  - name: String
  - isPurebred: Boolean
  - age: Number
  - favouriteToys: Array of ObjectId (references to Toy objects)
  - type: String ("dog" or "cat")
  - createdAt: Date
  - updatedAt: Date
- Uses discriminator pattern to support different animal types

#### Dog (extends Animal)
- Additional fields: 
  - barkType: String (default: "Woof")
- Discriminator value: "dog"

#### Cat (extends Animal)
- Additional fields: 
  - purssType: String (default: "Meow")
- Discriminator value: "cat"

#### Toy
- Contains: 
  - _id: ObjectId (String)
  - name: String
  - color: String
- Referenced by Animal schema via favouriteToys field

#### Relationships
- Animals can have multiple favorite toys (referenced by ObjectId)
- The application uses MongoDB's document references to maintain relationships between animals and toys

### Frontend Technologies

#### Framework and Libraries
- Next.js for server-side rendering and routing
- React Query (useQuery) for data fetching, caching, and state management
- Framer Motion for smooth animations and transitions

#### UI/UX Features
- Responsive design for all device sizes
- Interactive animations for enhanced user experience
- Optimized data loading with React Query's caching capabilities
- Server-side rendering for improved SEO and performance

### Tech Stack
- **Frontend**: Next.js, React
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose ORM
- **Language**: TypeScript
- **Styling**: CSS/SCSS (or specify your styling approach)
- **State Management**: React Query
- **Animations**: Framer Motion
- **Deployment**: Docker containerization
