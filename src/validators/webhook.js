import Joi from "@hapi/joi";

const schema = Joi.object({
  payload_header: Joi.string()
    .regex(/\./)
    .required(),
  payload: Joi.string().required(),
  signature: Joi.string()
    .length(64)
    .alphanum()
    .required(),
  time_range: Joi.object({
    start: Joi.string()
      .isoDate()
      .required(),
    end: Joi.string()
      .isoDate()
      .required()
  }).optional()
});

const webhookValidator = input => {
  return schema.validate(input, { abortEarly: false });
};

export default webhookValidator;
