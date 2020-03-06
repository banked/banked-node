import Joi from "@hapi/joi";

const schema = Joi.string()
  .guid({
    version: ["uuidv4", "uuidv5"]
  })
  .required();

const paymentIDValidator = input => {
  return schema.validate(input, { abortEarly: false });
};

export default paymentIDValidator;
