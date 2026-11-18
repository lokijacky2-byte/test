const Joi = require('@hapi/joi');

/**
 * Validation schema for creating a new example
 */
const createExampleSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .description('Name of the example'),
  
  description: Joi.string()
    .min(10)
    .max(500)
    .required()
    .description('Description of the example'),
  
  category: Joi.string()
    .valid('type1', 'type2', 'type3')
    .required()
    .description('Category of the example'),
  
  isActive: Joi.boolean()
    .default(true)
    .description('Whether the example is active'),
  
  tags: Joi.array()
    .items(Joi.string())
    .optional()
    .description('Array of tags'),
  
  metadata: Joi.object()
    .optional()
    .description('Additional metadata')
});

/**
 * Validation schema for updating an existing example
 */
const updateExampleSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .optional()
    .description('Name of the example'),
  
  description: Joi.string()
    .min(10)
    .max(500)
    .optional()
    .description('Description of the example'),
  
  category: Joi.string()
    .valid('type1', 'type2', 'type3')
    .optional()
    .description('Category of the example'),
  
  isActive: Joi.boolean()
    .optional()
    .description('Whether the example is active'),
  
  tags: Joi.array()
    .items(Joi.string())
    .optional()
    .description('Array of tags'),
  
  metadata: Joi.object()
    .optional()
    .description('Additional metadata')
}).min(1);

/**
 * Validation schema for ID parameter
 */
const idParamSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .description('Valid MongoDB ObjectId or UUID')
});

/**
 * Validation schema for query parameters
 */
const queryParamsSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .description('Page number for pagination'),
  
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .description('Number of items per page'),
  
  sort: Joi.string()
    .valid('name', '-name', 'createdAt', '-createdAt')
    .default('-createdAt')
    .description('Sort field and order'),
  
  category: Joi.string()
    .valid('type1', 'type2', 'type3')
    .optional()
    .description('Filter by category'),
  
  isActive: Joi.boolean()
    .optional()
    .description('Filter by active status')
});

module.exports = {
  createExampleSchema,
  updateExampleSchema,
  idParamSchema,
  queryParamsSchema
};

