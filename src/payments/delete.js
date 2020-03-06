import axios from "axios";
import paymentIDValidator from "../validators/payment-id";
import { constructAPIURI } from "../util/api";

const del = (paymentID = "") => {
  const { value, error } = paymentIDValidator(paymentID);
  if (error) {
    throw new Error(error);
  }
  return axios.delete(constructAPIURI(`/payment_sessions/${value}`));
};

export default del;
