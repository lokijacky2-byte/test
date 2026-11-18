# Backend Hapi.js API

A RESTful API built with Hapi.js framework featuring example CRUD operations, validation, and error handling.

## Project Structure

```
Backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers and business logic
│   ├── middleware/      # Custom middleware
│   ├── models/          # Data models and schemas
│   ├── plugins/         # Hapi.js plugins
│   ├── routes/          # Route definitions
│   ├── utils/           # Utility functions
│   ├── validators/      # Joi validation schemas
│   └── server.js        # Main server entry point
├── package.json
├── .env.example
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
cd Backend
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```
PORT=3000
HOST=localhost
NODE_ENV=development
```

### Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start at `http://localhost:3000`

## API Endpoints

### Health Check

**GET** `/health`
- Returns server health status
- Response:
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
- Returns API information
- Response:
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

### Example CRUD Operations

#### Get All Examples

**GET** `/api/example`

Query Parameters:
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `category` (string) - Filter by category (type1, type2, type3)
- `isActive` (boolean) - Filter by active status

Response:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Examples retrieved successfully",
  "data": {
    "examples": [...],
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

Response:
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
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Create Example

**POST** `/api/example`

Request Body:
```json
{
  "name": "New Example",
  "description": "This is a new example item",
  "category": "type1",
  "isActive": true,
  "tags": ["new", "test"],
  "metadata": {}
}
```

Response (201 Created):
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Example created successfully",
  "data": {
    "id": "generated-id",
    "name": "New Example",
    ...
  }
}
```

#### Update Example

**PUT** `/api/example/{id}`

Request Body (all fields optional):
```json
{
  "name": "Updated Example",
  "description": "Updated description",
  "category": "type2",
  "isActive": false
}
```

Response:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Example updated successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Updated Example",
    ...
  }
}
```

#### Delete Example

**DELETE** `/api/example/{id}`

Response:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Example deleted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

## Validation

All endpoints use Joi validation schemas:

### Create/Update Validation
- `name`: String, 3-100 characters, required (create only)
- `description`: String, 10-500 characters, required (create only)
- `category`: Enum (type1, type2, type3), required (create only)
- `isActive`: Boolean, default true
- `tags`: Array of strings, optional
- `metadata`: Object, optional

### ID Validation
- Must be a valid 24-character hexadecimal string (MongoDB ObjectId format)

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Example with id xyz not found"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Features

- ✅ RESTful API design
- ✅ Request validation with Joi
- ✅ Error handling with Boom
- ✅ CORS support
- ✅ Environment-based configuration
- ✅ Consistent response formatting
- ✅ Pagination support
- ✅ Filtering capabilities
- ✅ Health check endpoint

## Development

### Adding New Routes

1. Create a controller in `src/controllers/`
2. Create validation schemas in `src/validators/`
3. Define routes in `src/routes/`
4. Import and add routes to `src/routes/index.js`

### Project Dependencies

- `@hapi/hapi` - Web framework
- `@hapi/boom` - HTTP error responses
- `@hapi/joi` - Request validation
- `@hapi/inert` - Static file serving
- `@hapi/vision` - Template rendering
- `dotenv` - Environment variable management

## License

ISC

