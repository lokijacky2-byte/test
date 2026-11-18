const {
  getAllExamples,
  getExampleById,
  createExample,
  updateExample,
  deleteExample
} = require('../controllers/example.controller');

const {
  createExampleSchema,
  updateExampleSchema,
  idParamSchema,
  queryParamsSchema
} = require('../validators/example.validator');

/**
 * Example routes configuration
 */
const exampleRoutes = [
  {
    method: 'GET',
    path: '/api/example',
    handler: getAllExamples,
    options: {
      description: 'Get all examples',
      notes: 'Returns a list of all examples with optional filtering and pagination',
      tags: ['api', 'example'],
      validate: {
        query: queryParamsSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/api/example/{id}',
    handler: getExampleById,
    options: {
      description: 'Get example by ID',
      notes: 'Returns a single example by its ID',
      tags: ['api', 'example'],
      validate: {
        params: idParamSchema
      }
    }
  },
  {
    method: 'POST',
    path: '/api/example',
    handler: createExample,
    options: {
      description: 'Create a new example',
      notes: 'Creates a new example with the provided data',
      tags: ['api', 'example'],
      validate: {
        payload: createExampleSchema
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/example/{id}',
    handler: updateExample,
    options: {
      description: 'Update an example',
      notes: 'Updates an existing example by its ID',
      tags: ['api', 'example'],
      validate: {
        params: idParamSchema,
        payload: updateExampleSchema
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/example/{id}',
    handler: deleteExample,
    options: {
      description: 'Delete an example',
      notes: 'Deletes an example by its ID',
      tags: ['api', 'example'],
      validate: {
        params: idParamSchema
      }
    }
  }
];

module.exports = exampleRoutes;

