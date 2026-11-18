const Boom = require('@hapi/boom');
const { success, error } = require('../utils/response');

/**
 * In-memory storage for examples (replace with database in production)
 */
let examples = [
  {
    id: '507f1f77bcf86cd799439011',
    name: 'Example 1',
    description: 'This is the first example item',
    category: 'type1',
    isActive: true,
    tags: ['sample', 'demo'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '507f1f77bcf86cd799439012',
    name: 'Example 2',
    description: 'This is the second example item',
    category: 'type2',
    isActive: true,
    tags: ['test', 'demo'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

/**
 * Get all examples with optional filtering and pagination
 */
const getAllExamples = async (request, h) => {
  try {
    const { page = 1, limit = 10, category, isActive } = request.query;
    
    let filteredExamples = [...examples];
    
    if (category) {
      filteredExamples = filteredExamples.filter(ex => ex.category === category);
    }
    
    if (isActive !== undefined) {
      filteredExamples = filteredExamples.filter(ex => ex.isActive === isActive);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedExamples = filteredExamples.slice(startIndex, endIndex);
    
    return h.response(success({
      examples: paginatedExamples,
      pagination: {
        page,
        limit,
        total: filteredExamples.length,
        totalPages: Math.ceil(filteredExamples.length / limit)
      }
    }, 'Examples retrieved successfully')).code(200);
  } catch (err) {
    throw Boom.internal('Failed to retrieve examples');
  }
};

/**
 * Get a single example by ID
 */
const getExampleById = async (request, h) => {
  try {
    const { id } = request.params;
    
    const example = examples.find(ex => ex.id === id);
    
    if (!example) {
      throw Boom.notFound(`Example with id ${id} not found`);
    }
    
    return h.response(success(example, 'Example retrieved successfully')).code(200);
  } catch (err) {
    if (err.isBoom) {
      throw err;
    }
    throw Boom.internal('Failed to retrieve example');
  }
};

/**
 * Create a new example
 */
const createExample = async (request, h) => {
  try {
    const payload = request.payload;
    
    const newExample = {
      id: Math.random().toString(36).substr(2, 9) + Date.now().toString(36),
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    examples.push(newExample);
    
    return h.response(success(newExample, 'Example created successfully')).code(201);
  } catch (err) {
    throw Boom.internal('Failed to create example');
  }
};

/**
 * Update an existing example
 */
const updateExample = async (request, h) => {
  try {
    const { id } = request.params;
    const payload = request.payload;
    
    const exampleIndex = examples.findIndex(ex => ex.id === id);
    
    if (exampleIndex === -1) {
      throw Boom.notFound(`Example with id ${id} not found`);
    }
    
    examples[exampleIndex] = {
      ...examples[exampleIndex],
      ...payload,
      updatedAt: new Date().toISOString()
    };
    
    return h.response(success(examples[exampleIndex], 'Example updated successfully')).code(200);
  } catch (err) {
    if (err.isBoom) {
      throw err;
    }
    throw Boom.internal('Failed to update example');
  }
};

/**
 * Delete an example
 */
const deleteExample = async (request, h) => {
  try {
    const { id } = request.params;
    
    const exampleIndex = examples.findIndex(ex => ex.id === id);
    
    if (exampleIndex === -1) {
      throw Boom.notFound(`Example with id ${id} not found`);
    }
    
    const deletedExample = examples.splice(exampleIndex, 1)[0];
    
    return h.response(success(deletedExample, 'Example deleted successfully')).code(200);
  } catch (err) {
    if (err.isBoom) {
      throw err;
    }
    throw Boom.internal('Failed to delete example');
  }
};

module.exports = {
  getAllExamples,
  getExampleById,
  createExample,
  updateExample,
  deleteExample
};

