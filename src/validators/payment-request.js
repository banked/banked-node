import Joi from "@hapi/joi";

const schema = Joi.object({
  reference: Joi.string()
    .max(18)
    .required(),
  success_url: Joi.string()
    .uri()
    .required(),
  error_url: Joi.string()
    .uri()
    .required(),
  line_items: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        amount: Joi.number()
          .integer()
          .positive()
          .required()
          .strict(),
        currency: Joi.string()
          .valid("GBP", "EUR")
          .required()
          .strict(),
        quantity: Joi.number()
          .integer()
          .positive()
          .required()
          .strict(),
        description: Joi.string().optional()
      })
    )
    .min(1)
    .required(),
  payee: Joi.object({
    name: Joi.string().optional(),
    account_number: Joi.string()
      .regex(/^\d+$/)
      .length(8)
      .required(),
    sort_code: Joi.string()
      .regex(/^\d+$/)
      .length(6)
      .required()
  })
});

const paymentRequestValidator = input => {
  return schema.validate(input, { abortEarly: false });
};

export default paymentRequestValidator;
