import Joi from "@hapi/joi";

const schema = Joi.object({
  api_key: Joi.string().pattern(/^pk_/i),
  secret_key: Joi.string().pattern(/^sk_/i),
  access_token: Joi.string()
})
  .with("api_key", "secret_key")
  .xor("api_key", "access_token");

const keysValidator = input => {
  return schema.validate(input, { abortEarly: false });
};

export default keysValidator;
