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
export const getAPropertyRequest = async (id) => {
  const response = await axios.get(`api/properties/${id}`);
  return response.data;
};
// flats
export const getAFlatRequest = async (id) => {
  const response = await axios.get(`api/flats/${id}`);
  return response.data;
};
