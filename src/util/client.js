import axios from "axios";

let instance;

const bootstrapClient = keys => {
  instance = axios.create({
    baseURL: "https://api.banked.com/v2",
    timeout: 3000
  });
  instance.interceptors.request.use(config => {
    if (keys.access_token) {
      config.headers.Authorization = `Bearer ${keys.access_token}`;
    } else {
      config.auth = {
        username: keys.api_key,
        password: keys.secret_key
      };
    }
    return config;
  });
  return instance;
};

const getClient = () => {
  return instance;
};

export { bootstrapClient, getClient };
