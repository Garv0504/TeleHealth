/**
 * Wraps an async function to handle errors and pass them to Express's error handler
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Wrapped middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  // Resolve the returned promise to properly catch both async/await errors and promise rejections
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
