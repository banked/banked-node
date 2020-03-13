import Joi from "@hapi/joi";

const schema = Joi.object({
  timeout: Joi.number()
    .integer()
    .positive()
    .strict()
    .optional(),
  maxNetworkRetries: Joi.number()
    .integer()
    .positive()
    .strict()
    .optional(),
  proxy: Joi.object({
    host: Joi.string()
      .ip({
        version: ["ipv4", "ipv6"]
      })
      .required(),
    port: Joi.number()
      .strict()
      .port()
      .required(),
    auth: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    }).optional()
  }).optional()
});

const requestConfigValidator = input => {
  return schema.validate(input, { abortEarly: false });
};

export default requestConfigValidator;
