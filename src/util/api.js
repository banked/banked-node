const BASE_PATH = "https://banked.me/api/";
const API_VERSION = "v2";

const constructAPIURI = path => {
  return `${BASE_PATH}${API_VERSION}${path}`;
};

export { constructAPIURI };
