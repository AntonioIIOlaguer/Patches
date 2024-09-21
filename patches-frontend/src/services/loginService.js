import axios from "axios";

const baseUrl = "http://localhost:3001/api/login";

export const login = async () => {
  return (await axios.post(baseUrl)).data;
};
