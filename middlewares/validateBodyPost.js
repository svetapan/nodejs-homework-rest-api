const { HttpError } = require("../helpers");

const validateBodyPost = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);

    if (error) {
      if (
        error.details[0].context.key === "name" ||
        error.details[0].context.key === "email" ||
        error.details[0].context.key === "phone" ||
        error.details[0].context.key === "password"
      ) {
        if (error.details[0].type !== "string.base") {
          throw HttpError(
            400,
            `Missing required ${error.details[0].context.key} field`
          );
        } else {
          throw HttpError(400, error.message);
        }
      } else {
        throw HttpError(400, error.message);
      }
    }
    next();
  };
  return func;
};

module.exports = validateBodyPost;
