/**
 * Response interceptor middleware
 * Standardizes API responses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const responseInterceptor = (req, res, next) => {
  // Store the original res.json method
  const originalJson = res.json;

  // Override the res.json method
  res.json = function (data) {
    // If the response is already formatted, don't modify it
    if (data && data.success !== undefined) {
      return originalJson.call(this, data);
    }

    // Format the response
    const formattedResponse = {
      success: this.statusCode >= 200 && this.statusCode < 400,
      data: data || null,
      message: data && data.message ? data.message : null,
    };

    // Call the original json method with our formatted response
    return originalJson.call(this, formattedResponse);
  };

  next();
};

module.exports = responseInterceptor;
