/**
 * Utility functions for consistent API responses
 */

/**
 * Format a success response
 * @param {Object} data - Response data
 * @param {String} message - Success message
 * @param {Number} statusCode - HTTP status code (default: 200)
 * @returns {Object} Formatted success response
 */
const success = (data = null, message = 'Success', statusCode = 200) => {
  return {
    success: true,
    statusCode,
    message,
    data
  };
};

/**
 * Format an error response
 * @param {String} message - Error message
 * @param {Number} statusCode - HTTP status code (default: 500)
 * @param {Object} errors - Additional error details
 * @returns {Object} Formatted error response
 */
const error = (message = 'An error occurred', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    statusCode,
    message
  };

  if (errors) {
    response.errors = errors;
  }

  return response;
};

/**
 * Format a paginated response
 * @param {Array} data - Array of items
 * @param {Number} page - Current page number
 * @param {Number} limit - Items per page
 * @param {Number} total - Total number of items
 * @returns {Object} Formatted paginated response
 */
const paginated = (data, page, limit, total) => {
  return {
    success: true,
    statusCode: 200,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  };
};

module.exports = {
  success,
  error,
  paginated
};

