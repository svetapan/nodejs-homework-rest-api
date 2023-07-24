const { HttpError } = require("../helpers");

const validateBodyPut = (schema) => {
  const func = (req, res, next) => {
    // console.log(req.body);
    const { error } = schema.validate(req.body);

    if (!Object.keys(req.body).length) throw HttpError(400, `missing fields`);

    if (error) {
      if (
        error.details[0].context.key === "name" ||
        error.details[0].context.key === "email" ||
        error.details[0].context.key === "phone"
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

module.exports = validateBodyPut;
