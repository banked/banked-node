import axios from "axios";

const bootstrapClient = keys => {
  axios.interceptors.request.use(config => {
    config.auth = {
      username: keys.api_key,
      password: keys.secret_key
    };
    return config;
  });
};

export default bootstrapClient;
