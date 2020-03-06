import Joi from "@hapi/joi";

const schema = Joi.object({
  api_key: Joi.string()
    .pattern(/^pk_/i)
    .required(),
  secret_key: Joi.string()
    .pattern(/^sk_/i)
    .required()
});

const keysValidator = input => {
  return schema.validate(input, { abortEarly: false });
};

export default keysValidator;
