import Config from "./util/config";
import bootstrapClient from "./util/client";
import create from "./payments/create";

class Banked {
  constructor(keys = {}) {
    this.__config = new Config();
    this.__config.keys = keys;
    this.__client = bootstrapClient(this.__config.keys);
    this.payments = { create };
  }
}

export default Banked;
