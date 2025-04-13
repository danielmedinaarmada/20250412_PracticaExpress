function logErrors(err, req, res, next) {
  console.log("1er manejo del error");
  console.error(err.stack);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log("3er manejo del error");
  res.status(500).json({
    message: err.message,
    stach: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  console.log("2do manejo del error");
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

export { logErrors, errorHandler, boomErrorHandler };
