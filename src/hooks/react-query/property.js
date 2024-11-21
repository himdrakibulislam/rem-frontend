import axios from "../../lib/axios/axios";

// properties
export const createPropertyRequest = async (data) => {
  const response = await axios.post("api/properties", data);
  return response.data;
};
export const updatePropertyRequest = async (id,data) => {
  const response = await axios.put(`api/properties/${id}`, data);
  return response.data;
};
