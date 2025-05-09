class ErrorResponse extends Error {
  /**
   * Create custom ErrorResponse
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {object} [details] - Additional error details
   */
  constructor(message, statusCode, details = {}) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true; // Distinguish operational errors from programming errors

    // Capture stack trace (excluding constructor call from it)
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Create a bad request (400) error
   * @param {string} [message='Bad Request'] - Error message
   * @param {object} [details] - Additional error details
   * @returns {ErrorResponse}
   */
  static badRequest(message = "Bad Request", details) {
    return new ErrorResponse(message, 400, details);
  }

  /**
   * Create an unauthorized (401) error
   * @param {string} [message='Unauthorized'] - Error message
   * @param {object} [details] - Additional error details
   * @returns {ErrorResponse}
   */
  static unauthorized(message = "Unauthorized", details) {
    return new ErrorResponse(message, 401, details);
  }

  /**
   * Create a forbidden (403) error
   * @param {string} [message='Forbidden'] - Error message
   * @param {object} [details] - Additional error details
   * @returns {ErrorResponse}
   */
  static forbidden(message = "Forbidden", details) {
    return new ErrorResponse(message, 403, details);
  }

  /**
   * Create a not found (404) error
   * @param {string} [message='Not Found'] - Error message
   * @param {object} [details] - Additional error details
   * @returns {ErrorResponse}
   */
  static notFound(message = "Not Found", details) {
    return new ErrorResponse(message, 404, details);
  }

  /**
   * Create a conflict (409) error
   * @param {string} [message='Conflict'] - Error message
   * @param {object} [details] - Additional error details
   * @returns {ErrorResponse}
   */
  static conflict(message = "Conflict", details) {
    return new ErrorResponse(message, 409, details);
  }

  /**
   * Create a validation error (422)
   * @param {string} [message='Validation Error'] - Error message
   * @param {object} [details] - Additional error details
   * @returns {ErrorResponse}
   */
  static validationError(message = "Validation Error", details) {
    return new ErrorResponse(message, 422, details);
  }

  /**
   * Format error for API response
   * @returns {object} - Formatted error response
   */
  toJSON() {
    return {
      success: false,
      error: this.message,
      statusCode: this.statusCode,
      details: this.details,
      stack: process.env.NODE_ENV === "development" ? this.stack : undefined,
    };
  }
}

module.exports = ErrorResponse;
