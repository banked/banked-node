import keysValidator from "../validators/keys";

class Config {
  constructor() {
    this._keys = null;
  }

  get keys() {
    return this._keys;
  }

  set keys(keys) {
    const { value, error } = keysValidator(keys);
    if (error) {
      throw new Error(error);
    }
    this._keys = value;
  }
}

export default Config;
