const validateSchema = (schema) => (request, response, next) => {
    const { error } = schema.validate(request.body);
  
    if (error) {
      response.status(400).json({ message: error });
    } else {
      next();
    }
  };
  
  module.exports = { validateSchema };