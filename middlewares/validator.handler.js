import boom from '@hapi/boom';

function validatorHandler(schema, property) {
  return (req, rest, next) => {
    const data = req[property];
    const options = {
      abortEarly: false,
    };
    const { error } = schema.validate(data, options);

    if (error) {
      next(boom.badRequest(error));
    } else {
      next(error);
    }
  };
}

export default validatorHandler;
