import axios from "axios";
import paymentIDValidator from "../validators/payment-id";
import { constructAPIURI } from "../util/api";

const read = (paymentID = "") => {
  const { value, error } = paymentIDValidator(paymentID);
  if (error) {
    throw new Error(error);
  }
  return axios.get(constructAPIURI(`/payment_sessions/${value}`));
};

export default read;
