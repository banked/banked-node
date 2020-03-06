import axios from "axios";
import paymentRequestValidator from "../validators/payment-request";
import { constructAPIURI } from "../util/api";

const create = (paymentRequest = {}) => {
  const { value, error } = paymentRequestValidator(paymentRequest);
  if (error) {
    throw new Error(error);
  }
  return axios.post(constructAPIURI("/payment_sessions"), value);
};

export default create;
