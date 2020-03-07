import Joi from "@hapi/joi";

const schema = Joi.object({
  timeout: Joi.number()
    .integer()
    .positive()
    .strict()
    .optional()
});

const requestConfigValidator = input => {
  return schema.validate(input, { abortEarly: false });
};

export default requestConfigValidator;
