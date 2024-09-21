import axios from "axios";

const baseUrl = "http://localhost:3001/api/patches";

export const getPatches = async () => {
  return (await axios.get(baseUrl)).data;
};

export const uploadPatch = async (content) => {
  return (await axios.post(baseUrl, content)).data;
};
