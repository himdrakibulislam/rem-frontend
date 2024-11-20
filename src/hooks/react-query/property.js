import axios from "../../lib/axios/axios";

// properties
export const createPropertyRequest = async (data) => {
  const response = await axios.post("api/properties", data);
  return response.data;
};
