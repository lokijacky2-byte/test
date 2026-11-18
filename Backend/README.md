# Backend Hapi.js API

A production-ready RESTful API built with Hapi.js framework featuring modular architecture, comprehensive validation, error handling, and extensible plugin system.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Development Guide](#development-guide)
- [Plugin System](#plugin-system)
- [Best Practices](#best-practices)
- [Error Handling](#error-handling)

## Overview

This backend application is built using Hapi.js, a powerful and flexible Node.js framework. It follows a modular architecture with clear separation of concerns, making it easy to maintain, test, and scale.

### Key Features

- ✅ RESTful API design with resource-based routing
- ✅ Request validation with Joi schemas
- ✅ Centralized error handling with Boom
- ✅ CORS support for cross-origin requests
- ✅ Environment-based configuration
- ✅ Consistent response formatting
- ✅ Pagination and filtering capabilities
- ✅ Health check endpoint for monitoring
- ✅ Plugin-based architecture for extensibility
- ✅ Graceful shutdown handling

## Technology Stack

### Core Dependencies

- **[@hapi/hapi](https://hapi.dev/)** (v21.3.2) - Web framework for building applications and services
- **[@hapi/boom](https://hapi.dev/module/boom/)** (v10.0.1) - HTTP-friendly error objects
- **[@hapi/joi](https://joi.dev/)** (v17.1.1) - Schema description and data validation
- **[@hapi/inert](https://hapi.dev/module/inert/)** (v7.1.0) - Static file and directory handlers
- **[@hapi/vision](https://hapi.dev/module/vision/)** (v7.0.3) - Template rendering support
- **[dotenv](https://www.npmjs.com/package/dotenv)** (v16.3.1) - Environment variable management

### Development Dependencies

- **[nodemon](https://nodemon.io/)** (v3.0.2) - Auto-restart server on file changes

### Runtime Requirements

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (or yarn/pnpm)

## Project Structure

```
Backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── index.js         # Central config export
│   │   └── server.js        # Server configuration (host, port, CORS)
│   │
│   ├── controllers/         # Request handlers and business logic
│   │   └── example.controller.js
│   │
│   ├── middleware/          # Custom middleware (currently empty)
│   │
│   ├── models/              # Data models and schemas (currently empty)
│   │
│   ├── plugins/             # Hapi.js plugins
│   │   └── index.js         # Plugin registration and custom plugins
│   │
│   ├── routes/              # Route definitions
│   │   ├── index.js         # Central route export
│   │   └── example.routes.js
│   │
│   ├── utils/               # Utility functions
│   │   └── response.js      # Response formatting helpers
│   │
│   ├── validators/          # Joi validation schemas
│   │   └── example.validator.js
│   │
│   └── server.js            # Main server entry point
│
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies and scripts
└── README.md                # This file
```

### Directory Details

#### `src/config/`
Contains all configuration files for the application. This includes server settings, database connections, third-party service configurations, and environment-specific settings.

**Purpose**: Centralize configuration management and make it easy to modify settings without touching business logic.

#### `src/controllers/`
Houses the business logic and request handlers. Controllers receive requests from routes, process them (validate, transform data, interact with models), and return responses.

**Purpose**: Separate business logic from routing, making code more testable and maintainable.

#### `src/middleware/`
Custom middleware functions that can be applied to routes for cross-cutting concerns like authentication, logging, rate limiting, etc.

**Purpose**: Implement reusable logic that needs to run before or after route handlers.

#### `src/models/`
Data models and schemas representing your application's domain entities. This is where you'd define database models (e.g., Mongoose schemas, Sequelize models).

**Purpose**: Define data structure and provide an abstraction layer for data access.

#### `src/plugins/`
Hapi.js plugins for extending server functionality. Includes both third-party plugins and custom plugins for features like error handling, logging, authentication, etc.

**Purpose**: Modularize functionality and make it reusable across different parts of the application.

#### `src/routes/`
Route definitions that map HTTP endpoints to controller functions. Each route file typically corresponds to a resource or feature.

**Purpose**: Define the API surface and connect HTTP requests to appropriate handlers.

#### `src/utils/`
Utility functions and helper modules used throughout the application. These are pure functions that don't depend on application state.

**Purpose**: Provide reusable functionality and reduce code duplication.

#### `src/validators/`
Joi validation schemas for request validation. Each validator file typically corresponds to a resource and defines schemas for different operations (create, update, query).

**Purpose**: Ensure data integrity and provide clear validation rules separate from business logic.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

### Installation

1. **Navigate to the Backend directory:**
```bash
cd Backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

4. **Configure your `.env` file:**
```env
# Server Configuration
PORT=3000
HOST=localhost
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Add other environment variables as needed
# DATABASE_URL=mongodb://localhost:27017/myapp
# JWT_SECRET=your-secret-key
# API_KEY=your-api-key
```

### Running the Application

**Development mode** (with auto-reload using nodemon):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start at `http://localhost:3000` (or the port specified in your `.env` file).

### Verify Installation

Once the server is running, you can verify it's working by visiting:

- **Root endpoint**: http://localhost:3000/
- **Health check**: http://localhost:3000/health

## API Endpoints

### Health Check

**GET** `/health`

Returns server health status and uptime information.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

### Root Endpoint

**GET** `/`

Returns API information and available endpoints.

**Response:**
```json
{
  "message": "Welcome to Backend Hapi.js API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "examples": "/api/example"
  }
}
```

### Example Resource CRUD Operations

#### Get All Examples

**GET** `/api/example`

Retrieve a paginated list of examples with optional filtering.

**Query Parameters:**
- `page` (number, default: 1) - Page number for pagination
- `limit` (number, default: 10, max: 100) - Items per page
- `category` (string) - Filter by category (type1, type2, type3)
- `isActive` (boolean) - Filter by active status

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/example?page=1&limit=10&category=type1&isActive=true"
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Examples retrieved successfully",
  "data": {
    "examples": [
      {
        "id": "507f1f77bcf86cd799439011",
        "name": "Example 1",
        "description": "This is the first example item",
        "category": "type1",
        "isActive": true,
        "tags": ["sample", "demo"],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 2,
      "totalPages": 1
    }
  }
}
```

#### Get Example by ID

**GET** `/api/example/{id}`

Retrieve a single example by its ID.

**Path Parameters:**
- `id` (string, required) - Example ID (24-character hexadecimal string)

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/example/507f1f77bcf86cd799439011"
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Example retrieved successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Example 1",
    "description": "This is the first example item",
    "category": "type1",
    "isActive": true,
    "tags": ["sample", "demo"],
    "metadata": {},
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Create Example

**POST** `/api/example`

Create a new example.

**Request Body:**
```json
{
  "name": "New Example",
  "description": "This is a new example item with detailed description",
  "category": "type1",
  "isActive": true,
  "tags": ["new", "test"],
  "metadata": {
    "author": "John Doe",
    "version": "1.0"
  }
}
```

**Validation Rules:**
- `name`: String, 3-100 characters, required
- `description`: String, 10-500 characters, required
- `category`: Enum (type1, type2, type3), required
- `isActive`: Boolean, default true
- `tags`: Array of strings, optional
- `metadata`: Object, optional

**Example Request:**
```bash
curl -X POST "http://localhost:3000/api/example" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Example",
    "description": "This is a new example item with detailed description",
    "category": "type1",
    "isActive": true,
    "tags": ["new", "test"]
  }'
```

**Response (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Example created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "name": "New Example",
    "description": "This is a new example item with detailed description",
    "category": "type1",
    "isActive": true,
    "tags": ["new", "test"],
    "metadata": {},
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Example

**PUT** `/api/example/{id}`

Update an existing example. All fields are optional.

**Path Parameters:**
- `id` (string, required) - Example ID

**Request Body (all fields optional):**
```json
{
  "name": "Updated Example",
  "description": "Updated description with more details",
  "category": "type2",
  "isActive": false,
  "tags": ["updated"],
  "metadata": {
    "lastModifiedBy": "Jane Doe"
  }
}
```

**Example Request:**
```bash
curl -X PUT "http://localhost:3000/api/example/507f1f77bcf86cd799439011" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Example",
    "isActive": false
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Example updated successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Updated Example",
    "description": "This is the first example item",
    "category": "type1",
    "isActive": false,
    "tags": ["sample", "demo"],
    "metadata": {},
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Delete Example

**DELETE** `/api/example/{id}`

Delete an example by its ID.

**Path Parameters:**
- `id` (string, required) - Example ID

**Example Request:**
```bash
curl -X DELETE "http://localhost:3000/api/example/507f1f77bcf86cd799439011"
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Example deleted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Example 1",
    "description": "This is the first example item",
    "category": "type1",
    "isActive": true,
    "tags": ["sample", "demo"],
    "metadata": {},
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```



## Architecture & Design Patterns

### Layered Architecture

This application follows a **layered architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────┐
│         Routes Layer                │  ← HTTP endpoint definitions
├─────────────────────────────────────┤
│       Validators Layer              │  ← Request validation (Joi schemas)
├─────────────────────────────────────┤
│      Controllers Layer              │  ← Business logic and orchestration
├─────────────────────────────────────┤
│         Models Layer                │  ← Data models and database access
├─────────────────────────────────────┤
│         Utils Layer                 │  ← Helper functions and utilities
└─────────────────────────────────────┘
```

### Design Patterns Used

#### 1. **MVC Pattern (Model-View-Controller)**
- **Models**: Define data structure and business entities
- **Views**: JSON responses (handled by response utilities)
- **Controllers**: Handle requests and coordinate between models and views

#### 2. **Repository Pattern**
- Controllers don't directly access data storage
- Models act as repositories providing abstraction over data access
- Makes it easy to swap data sources (e.g., from in-memory to database)

#### 3. **Plugin Pattern**
- Functionality is modularized into plugins
- Plugins can be easily added, removed, or replaced
- Promotes code reusability and separation of concerns

#### 4. **Factory Pattern**
- Response utilities act as factories for creating consistent response objects
- Ensures all API responses follow the same structure

#### 5. **Dependency Injection**
- Configuration is injected into the server
- Makes testing easier and reduces coupling

### Request Flow

```
1. HTTP Request
   ↓
2. Hapi.js Router (matches route)
   ↓
3. Validator (Joi schema validation)
   ↓
4. Controller (business logic)
   ↓
5. Model (data access - if needed)
   ↓
6. Response Formatter (consistent response)
   ↓
7. HTTP Response
```

### Error Handling Flow

```
1. Error occurs in Controller/Model
   ↓
2. Boom error object created
   ↓
3. Custom error handler plugin
   ↓
4. Formatted error response
   ↓
5. HTTP error response to client
```

## Development Guide

### Adding a New Resource

Follow these steps to add a new resource (e.g., "User") to the API:

#### Step 1: Create the Model (Optional)

If you need data persistence, create a model in `src/models/`:

```javascript
// src/models/user.model.js

class UserModel {
  constructor() {
    this.users = []; // In-memory storage (replace with database)
  }

  async findAll() {
    return this.users;
  }

  async findById(id) {
    return this.users.find(user => user.id === id);
  }

  async create(userData) {
    const user = {
      id: this.generateId(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(user);
    return user;
  }

  async update(id, userData) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    
    this.users[index] = {
      ...this.users[index],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    
    const [deletedUser] = this.users.splice(index, 1);
    return deletedUser;
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}

module.exports = new UserModel();
```

#### Step 2: Create Validation Schemas

Create validation schemas in `src/validators/`:

```javascript
// src/validators/user.validator.js

const Joi = require('@hapi/joi');

const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  role: Joi.string().valid('user', 'admin').default('user')
});

const updateUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(50),
  role: Joi.string().valid('user', 'admin')
}).min(1); // At least one field must be provided

const userIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

const queryUserSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  role: Joi.string().valid('user', 'admin'),
  search: Joi.string().min(1).max(100)
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
  queryUserSchema
};
```

#### Step 3: Create Controller

Create controller with business logic in `src/controllers/`:

```javascript
// src/controllers/user.controller.js

const Boom = require('@hapi/boom');
const UserModel = require('../models/user.model');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');

const getAllUsers = async (request, h) => {
  try {
    const { page, limit, role, search } = request.query;
    
    let users = await UserModel.findAll();
    
    // Apply filters
    if (role) {
      users = users.filter(user => user.role === role);
    }
    
    if (search) {
      users = users.filter(user => 
        user.username.includes(search) || 
        user.email.includes(search)
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = users.slice(startIndex, endIndex);
    
    return h.response(paginatedResponse(
      paginatedUsers,
      page,
      limit,
      users.length,
      'Users retrieved successfully'
    )).code(200);
    
  } catch (error) {
    throw Boom.internal('Failed to retrieve users');
  }
};

const getUserById = async (request, h) => {
  try {
    const { id } = request.params;
    const user = await UserModel.findById(id);
    
    if (!user) {
      throw Boom.notFound(`User with id ${id} not found`);
    }
    
    return h.response(successResponse(user, 'User retrieved successfully')).code(200);
    
  } catch (error) {
    if (error.isBoom) throw error;
    throw Boom.internal('Failed to retrieve user');
  }
};

const createUser = async (request, h) => {
  try {
    const userData = request.payload;
    
    // Check if user already exists
    const existingUser = await UserModel.findByEmail(userData.email);
    if (existingUser) {
      throw Boom.conflict('User with this email already exists');
    }
    
    const newUser = await UserModel.create(userData);
    
    return h.response(successResponse(newUser, 'User created successfully')).code(201);
    
  } catch (error) {
    if (error.isBoom) throw error;
    throw Boom.internal('Failed to create user');
  }
};

const updateUser = async (request, h) => {
  try {
    const { id } = request.params;
    const updateData = request.payload;
    
    const updatedUser = await UserModel.update(id, updateData);
    
    if (!updatedUser) {
      throw Boom.notFound(`User with id ${id} not found`);
    }
    
    return h.response(successResponse(updatedUser, 'User updated successfully')).code(200);
    
  } catch (error) {
    if (error.isBoom) throw error;
    throw Boom.internal('Failed to update user');
  }
};

const deleteUser = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedUser = await UserModel.delete(id);
    
    if (!deletedUser) {
      throw Boom.notFound(`User with id ${id} not found`);
    }
    
    return h.response(successResponse(deletedUser, 'User deleted successfully')).code(200);
    
  } catch (error) {
    if (error.isBoom) throw error;
    throw Boom.internal('Failed to delete user');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
```

#### Step 4: Create Routes

Define routes in `src/routes/`:

```javascript
// src/routes/user.routes.js

const UserController = require('../controllers/user.controller');
const {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
  queryUserSchema
} = require('../validators/user.validator');

const userRoutes = [
  {
    method: 'GET',
    path: '/api/users',
    handler: UserController.getAllUsers,
    options: {
      description: 'Get all users',
      tags: ['api', 'users'],
      validate: {
        query: queryUserSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/api/users/{id}',
    handler: UserController.getUserById,
    options: {
      description: 'Get user by ID',
      tags: ['api', 'users'],
      validate: {
        params: userIdSchema
      }
    }
  },
  {
    method: 'POST',
    path: '/api/users',
    handler: UserController.createUser,
    options: {
      description: 'Create a new user',
      tags: ['api', 'users'],
      validate: {
        payload: createUserSchema
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/users/{id}',
    handler: UserController.updateUser,
    options: {
      description: 'Update user by ID',
      tags: ['api', 'users'],
      validate: {
        params: userIdSchema,
        payload: updateUserSchema
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/users/{id}',
    handler: UserController.deleteUser,
    options: {
      description: 'Delete user by ID',
      tags: ['api', 'users'],
      validate: {
        params: userIdSchema
      }
    }
  }
];

module.exports = userRoutes;
```

#### Step 5: Register Routes

Add your new routes to `src/routes/index.js`:

```javascript
// src/routes/index.js

const exampleRoutes = require('./example.routes');
const userRoutes = require('./user.routes'); // Add this line

const routes = [
  // Root endpoint
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return {
        message: 'Welcome to Backend Hapi.js API',
        version: '1.0.0',
        endpoints: {
          health: '/health',
          examples: '/api/example',
          users: '/api/users' // Add this line
        }
      };
    }
  },
  
  // Health check endpoint
  {
    method: 'GET',
    path: '/health',
    handler: (request, h) => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      };
    }
  },
  
  // Register resource routes
  ...exampleRoutes,
  ...userRoutes // Add this line
];

module.exports = routes;
```

That's it! Your new resource is now fully integrated into the API.

### Testing Your New Resource

Test your new endpoints using curl or a tool like Postman:

```bash
# Get all users
curl -X GET "http://localhost:3000/api/users"

# Create a user
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepass123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Get user by ID
curl -X GET "http://localhost:3000/api/users/{id}"

# Update user
curl -X PUT "http://localhost:3000/api/users/{id}" \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Jane"}'

# Delete user
curl -X DELETE "http://localhost:3000/api/users/{id}"
```



## Plugin System

Hapi.js uses a powerful plugin system that allows you to extend server functionality in a modular way. Plugins can add routes, methods, decorations, and more.

### Built-in Plugins

The application uses the following Hapi.js plugins:

#### 1. **@hapi/inert**
Provides static file and directory handlers.

```javascript
// Already registered in src/plugins/index.js
await server.register(require('@hapi/inert'));
```

**Use case**: Serve static files like images, CSS, JavaScript files.

#### 2. **@hapi/vision**
Adds template rendering support to Hapi.js.

```javascript
// Already registered in src/plugins/index.js
await server.register(require('@hapi/vision'));
```

**Use case**: Render HTML templates using engines like Handlebars, Pug, or EJS.

#### 3. **Custom Error Handler Plugin**
A custom plugin that handles errors consistently across the application.

```javascript
// Already implemented in src/plugins/index.js
const errorHandlerPlugin = {
  name: 'error-handler',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', (request, h) => {
      const response = request.response;
      
      if (response.isBoom) {
        const error = response;
        const statusCode = error.output.statusCode;
        const message = error.message;
        
        return h.response({
          success: false,
          statusCode,
          message,
          ...(process.env.NODE_ENV === 'development' && { 
            stack: error.stack 
          })
        }).code(statusCode);
      }
      
      return h.continue;
    });
  }
};
```

### Creating Custom Plugins

#### Example 1: Authentication Plugin

Create a custom authentication plugin:

```javascript
// src/plugins/auth.plugin.js

const Boom = require('@hapi/boom');

const authPlugin = {
  name: 'auth-plugin',
  version: '1.0.0',
  register: async (server, options) => {
    
    // Define authentication scheme
    const scheme = (server, options) => {
      return {
        authenticate: async (request, h) => {
          const authorization = request.headers.authorization;
          
          if (!authorization) {
            throw Boom.unauthorized('Missing authorization header');
          }
          
          // Extract token
          const token = authorization.replace('Bearer ', '');
          
          // Validate token (implement your logic here)
          try {
            const credentials = await validateToken(token);
            return h.authenticated({ credentials });
          } catch (error) {
            throw Boom.unauthorized('Invalid token');
          }
        }
      };
    };
    
    // Register the scheme
    server.auth.scheme('custom-jwt', scheme);
    
    // Define strategy
    server.auth.strategy('jwt', 'custom-jwt');
    
    // Set default strategy (optional)
    // server.auth.default('jwt');
  }
};

// Token validation function (implement based on your needs)
async function validateToken(token) {
  // Implement JWT validation, database lookup, etc.
  // Return user credentials if valid, throw error if invalid
  return { id: '123', username: 'user' };
}

module.exports = authPlugin;
```

**Register the plugin:**

```javascript
// src/plugins/index.js

const authPlugin = require('./auth.plugin');

const registerPlugins = async (server) => {
  await server.register([
    require('@hapi/inert'),
    require('@hapi/vision'),
    authPlugin, // Add your custom plugin
    errorHandlerPlugin
  ]);
};
```

**Use in routes:**

```javascript
// src/routes/protected.routes.js

const protectedRoutes = [
  {
    method: 'GET',
    path: '/api/protected',
    handler: (request, h) => {
      // Access authenticated user
      const user = request.auth.credentials;
      return { message: `Hello ${user.username}` };
    },
    options: {
      auth: 'jwt' // Require authentication
    }
  }
];
```

#### Example 2: Logging Plugin

Create a request logging plugin:

```javascript
// src/plugins/logger.plugin.js

const loggerPlugin = {
  name: 'logger-plugin',
  version: '1.0.0',
  register: async (server, options) => {
    
    // Log all requests
    server.ext('onRequest', (request, h) => {
      console.log(`[${new Date().toISOString()}] ${request.method.toUpperCase()} ${request.path}`);
      return h.continue;
    });
    
    // Log all responses
    server.ext('onPreResponse', (request, h) => {
      const response = request.response;
      const statusCode = response.isBoom 
        ? response.output.statusCode 
        : response.statusCode;
      
      console.log(`[${new Date().toISOString()}] ${request.method.toUpperCase()} ${request.path} - ${statusCode}`);
      return h.continue;
    });
    
    // Add server method for logging
    server.method('log', (level, message, data) => {
      console.log(`[${level.toUpperCase()}] ${message}`, data || '');
    });
  }
};

module.exports = loggerPlugin;
```

**Use the logging method:**

```javascript
// In any controller
const someController = async (request, h) => {
  request.server.methods.log('info', 'Processing request', { userId: 123 });
  // ... rest of the logic
};
```

#### Example 3: Rate Limiting Plugin

Create a simple rate limiting plugin:

```javascript
// src/plugins/rate-limit.plugin.js

const Boom = require('@hapi/boom');

const rateLimitPlugin = {
  name: 'rate-limit-plugin',
  version: '1.0.0',
  register: async (server, options) => {
    const { max = 100, window = 60000 } = options; // 100 requests per minute
    const requests = new Map();
    
    server.ext('onPreAuth', (request, h) => {
      const ip = request.info.remoteAddress;
      const now = Date.now();
      
      if (!requests.has(ip)) {
        requests.set(ip, []);
      }
      
      const userRequests = requests.get(ip);
      
      // Remove old requests outside the time window
      const recentRequests = userRequests.filter(time => now - time < window);
      
      if (recentRequests.length >= max) {
        throw Boom.tooManyRequests('Rate limit exceeded');
      }
      
      recentRequests.push(now);
      requests.set(ip, recentRequests);
      
      return h.continue;
    });
    
    // Clean up old entries periodically
    setInterval(() => {
      const now = Date.now();
      for (const [ip, times] of requests.entries()) {
        const recent = times.filter(time => now - time < window);
        if (recent.length === 0) {
          requests.delete(ip);
        } else {
          requests.set(ip, recent);
        }
      }
    }, window);
  }
};

module.exports = rateLimitPlugin;
```

**Register with options:**

```javascript
// src/plugins/index.js

const rateLimitPlugin = require('./rate-limit.plugin');

const registerPlugins = async (server) => {
  await server.register([
    require('@hapi/inert'),
    require('@hapi/vision'),
    {
      plugin: rateLimitPlugin,
      options: {
        max: 100,      // Maximum requests
        window: 60000  // Time window in milliseconds
      }
    },
    errorHandlerPlugin
  ]);
};
```

### Plugin Best Practices

1. **Single Responsibility**: Each plugin should have one clear purpose
2. **Configuration**: Accept options for flexibility
3. **Error Handling**: Handle errors gracefully and provide meaningful messages
4. **Documentation**: Document plugin options and usage
5. **Testing**: Write tests for plugin functionality
6. **Naming**: Use descriptive names with `-plugin` suffix
7. **Versioning**: Include version in plugin definition
8. **Dependencies**: Declare plugin dependencies if needed

### Server Extensions

Hapi.js provides several extension points where plugins can hook into the request lifecycle:

- **onRequest**: Called at the beginning of the request
- **onPreAuth**: Called before authentication
- **onCredentials**: Called after authentication
- **onPreHandler**: Called before the route handler
- **onPostHandler**: Called after the route handler
- **onPreResponse**: Called before the response is sent

Example of using multiple extension points:

```javascript
const multiExtensionPlugin = {
  name: 'multi-extension',
  version: '1.0.0',
  register: async (server, options) => {
    
    server.ext('onRequest', (request, h) => {
      request.app.startTime = Date.now();
      return h.continue;
    });
    
    server.ext('onPreResponse', (request, h) => {
      const duration = Date.now() - request.app.startTime;
      console.log(`Request took ${duration}ms`);
      return h.continue;
    });
  }
};
```



## Best Practices

### Code Organization

#### 1. **Keep Controllers Thin**
Controllers should orchestrate, not implement business logic.

**Bad:**
```javascript
const createUser = async (request, h) => {
  const { email, password } = request.payload;
  
  // Too much logic in controller
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.users.create({ email, password: hashedPassword });
  await sendWelcomeEmail(user.email);
  await logUserCreation(user.id);
  
  return h.response(user).code(201);
};
```

**Good:**
```javascript
const createUser = async (request, h) => {
  const userData = request.payload;
  
  // Delegate to service/model
  const user = await UserService.createUser(userData);
  
  return h.response(successResponse(user, 'User created')).code(201);
};
```

#### 2. **Use Consistent Response Format**
Always use the response utilities for consistent API responses.

```javascript
// Use these helpers from src/utils/response.js
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');

// Success response
return h.response(successResponse(data, 'Success message')).code(200);

// Paginated response
return h.response(paginatedResponse(items, page, limit, total, 'Message')).code(200);
```

#### 3. **Validate Everything**
Use Joi schemas to validate all inputs (params, query, payload).

```javascript
{
  method: 'POST',
  path: '/api/resource',
  handler: ResourceController.create,
  options: {
    validate: {
      payload: createResourceSchema,
      query: querySchema,
      params: paramsSchema
    }
  }
}
```

#### 4. **Handle Errors Properly**
Use Boom for HTTP errors and let the error handler plugin format them.

```javascript
const Boom = require('@hapi/boom');

// Not found
throw Boom.notFound('Resource not found');

// Bad request
throw Boom.badRequest('Invalid input');

// Unauthorized
throw Boom.unauthorized('Invalid credentials');

// Forbidden
throw Boom.forbidden('Access denied');

// Conflict
throw Boom.conflict('Resource already exists');

// Internal error
throw Boom.internal('Something went wrong');
```

#### 5. **Use Environment Variables**
Never hardcode configuration values.

```javascript
// Bad
const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/mydb';

// Good
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;
```

#### 6. **Implement Proper Logging**
Log important events and errors for debugging and monitoring.

```javascript
// Log errors
console.error('[ERROR]', error.message, error.stack);

// Log important events
console.log('[INFO] User created:', userId);

// Use structured logging in production
console.log(JSON.stringify({
  level: 'info',
  message: 'User created',
  userId,
  timestamp: new Date().toISOString()
}));
```

### Security Best Practices

#### 1. **Input Validation**
- Always validate and sanitize user input
- Use Joi schemas for validation
- Never trust client data

#### 2. **Authentication & Authorization**
- Implement proper authentication (JWT, OAuth, etc.)
- Use HTTPS in production
- Store passwords securely (bcrypt, argon2)
- Implement role-based access control (RBAC)

#### 3. **Rate Limiting**
- Implement rate limiting to prevent abuse
- Use the rate limiting plugin or a service like Redis

#### 4. **CORS Configuration**
- Configure CORS properly for your use case
- Don't use `*` in production

```javascript
// src/config/server.js
routes: {
  cors: {
    origin: [process.env.CORS_ORIGIN || 'http://localhost:3000'],
    credentials: true
  }
}
```

#### 5. **Error Messages**
- Don't expose sensitive information in error messages
- Use generic messages in production
- Log detailed errors server-side

```javascript
// Development
throw Boom.internal('Database connection failed: ' + error.message);

// Production
throw Boom.internal('An error occurred. Please try again later.');
```

#### 6. **Dependencies**
- Keep dependencies up to date
- Use `npm audit` to check for vulnerabilities
- Only install trusted packages

### Performance Best Practices

#### 1. **Pagination**
Always paginate large datasets.

```javascript
const { page = 1, limit = 10 } = request.query;
const skip = (page - 1) * limit;

const items = await Model.find().skip(skip).limit(limit);
const total = await Model.countDocuments();
```

#### 2. **Caching**
Implement caching for frequently accessed data.

```javascript
// Use server methods with caching
server.method('getUser', async (id) => {
  return await UserModel.findById(id);
}, {
  cache: {
    expiresIn: 60 * 1000, // 1 minute
    generateTimeout: 2000
  }
});
```

#### 3. **Database Indexing**
Create indexes on frequently queried fields.

```javascript
// MongoDB example
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
```

#### 4. **Async/Await**
Use async/await for better readability and error handling.

```javascript
// Good
const user = await UserModel.findById(id);
const posts = await PostModel.findByUserId(user.id);

// Avoid callback hell
UserModel.findById(id, (err, user) => {
  PostModel.findByUserId(user.id, (err, posts) => {
    // ...
  });
});
```

### Testing Best Practices

#### 1. **Write Tests**
Write unit tests for controllers, models, and utilities.

```javascript
// Example test structure
describe('UserController', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      // Test implementation
    });
    
    it('should return 400 for invalid data', async () => {
      // Test implementation
    });
  });
});
```

#### 2. **Test Coverage**
Aim for high test coverage, especially for critical paths.

#### 3. **Integration Tests**
Test API endpoints end-to-end.

```javascript
const response = await server.inject({
  method: 'POST',
  url: '/api/users',
  payload: { username: 'test', email: 'test@example.com' }
});

expect(response.statusCode).toBe(201);
```

### Documentation Best Practices

#### 1. **Code Comments**
Write comments for complex logic, not obvious code.

```javascript
// Bad: Obvious comment
// Increment counter by 1
counter++;

// Good: Explains why
// Use exponential backoff to avoid overwhelming the API
await delay(Math.pow(2, retryCount) * 1000);
```

#### 2. **API Documentation**
Document all endpoints with:
- Description
- Request parameters
- Response format
- Example requests/responses
- Error codes

#### 3. **README Updates**
Keep the README up to date with:
- New features
- Configuration changes
- Breaking changes
- Migration guides

## Error Handling

### Error Response Format

All errors follow a consistent format:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Resource not found"
}
```

In development mode, errors include stack traces:

```json
{
  "success": false,
  "statusCode": 500,
  "message": "Internal server error",
  "stack": "Error: Something went wrong\n    at ..."
}
```

### Common HTTP Status Codes

| Status Code | Meaning | When to Use |
|------------|---------|-------------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 204 | No Content | Successful DELETE (no response body) |
| 400 | Bad Request | Invalid request data (validation error) |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 422 | Unprocessable Entity | Valid syntax but semantic errors |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | Server temporarily unavailable |

### Validation Errors

Joi validation errors are automatically formatted:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "\"email\" must be a valid email"
}
```

### Custom Error Handling

You can create custom error types:

```javascript
// src/utils/errors.js

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  ValidationError,
  NotFoundError
};
```

Use in controllers:

```javascript
const { NotFoundError } = require('../utils/errors');

const getUser = async (request, h) => {
  const user = await UserModel.findById(request.params.id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  return h.response(successResponse(user)).code(200);
};
```

### Error Logging

Log errors for debugging and monitoring:

```javascript
// In error handler plugin
server.ext('onPreResponse', (request, h) => {
  const response = request.response;
  
  if (response.isBoom) {
    // Log error details
    console.error({
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.path,
      statusCode: response.output.statusCode,
      message: response.message,
      stack: response.stack
    });
  }
  
  return h.continue;
});
```

### Graceful Error Recovery

Implement graceful error recovery:

```javascript
// Retry logic for transient errors
async function retryOperation(operation, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(Math.pow(2, i) * 1000); // Exponential backoff
    }
  }
}

// Use in controller
const data = await retryOperation(() => externalAPI.fetchData());
```

## Additional Resources

### Hapi.js Documentation
- [Official Hapi.js Documentation](https://hapi.dev/)
- [Hapi.js API Reference](https://hapi.dev/api/)
- [Hapi.js Tutorials](https://hapi.dev/tutorials/)

### Related Libraries
- [@hapi/boom](https://hapi.dev/module/boom/) - HTTP error responses
- [@hapi/joi](https://joi.dev/) - Data validation
- [@hapi/inert](https://hapi.dev/module/inert/) - Static file serving
- [@hapi/vision](https://hapi.dev/module/vision/) - Template rendering

### Community
- [Hapi.js GitHub](https://github.com/hapijs/hapi)
- [Stack Overflow - Hapi.js](https://stackoverflow.com/questions/tagged/hapijs)

## Contributing

When contributing to this project:

1. Follow the existing code style and structure
2. Write tests for new features
3. Update documentation as needed
4. Create meaningful commit messages
5. Submit pull requests for review

## License

ISC

---

**Built with ❤️ using Hapi.js**

For questions or issues, please open an issue on the project repository.

