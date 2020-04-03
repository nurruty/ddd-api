
const ValidationError = (details) => {
  const error = new Error('ValidationError');
  error.details = details;
  return error;
};

const NotFoundError = (details) => {
  const error = new Error('NotFoundError');
  error.details = details;
  return error;
};

const AlreadyExistsError = (details) => {
  const error = new Error('AlreadyExistsError');
  error.details = details;
  return error;
};

module.exports = {
  ValidationError,
  NotFoundError,
  AlreadyExistsError
}