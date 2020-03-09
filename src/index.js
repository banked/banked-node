// Setup
import { bootstrapClient } from "./util/client";
import keysValidator from "./validators/keys";
import requestConfigValidator from "./validators/request-config";
// Payments
import create from "./payments/create";
import read from "./payments/read";
import del from "./payments/delete";
// Webhooks
import validate from "./webhooks/validate";

class Banked {
  constructor(keys = {}, requestConfig) {
    const k = keysValidator(keys);
    const r = requestConfigValidator(requestConfig);
    if (k.error) {
      throw new Error(k.error);
    }
    if (r.error) {
      throw new Error(r.error);
    }
    bootstrapClient(k.value, r.value);
    this.payments = {
      create,
      read,
      delete: del
    };
    this.webhooks = {
      validate
    };
  }
}

module.exports = Banked;
