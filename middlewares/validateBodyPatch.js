const { HttpError } = require("../helpers");

const validateBodyPatch = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      if (error.details[0].context.key === "favorite") {
        throw HttpError(400, "missing field favorite");
      } else {
        throw HttpError(400, error.message);
      }
    }
    next();
  };
  return func;
};

module.exports = validateBodyPatch;
