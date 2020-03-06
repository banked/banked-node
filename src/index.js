import Config from "./util/config";
import bootstrapClient from "./util/client";
import create from "./payments/create";
import read from "./payments/read";
import del from "./payments/delete";

class Banked {
  constructor(keys = {}) {
    this.__config = new Config();
    this.__config.keys = keys;
    this.__client = bootstrapClient(this.__config.keys);
    this.payments = {
      create,
      read,
      delete: del
    };
  }
}

export default Banked;
