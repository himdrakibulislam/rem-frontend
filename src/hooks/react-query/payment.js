import axiosInstance from "../../lib/axios/axios";

export const updatePaymentRequest = async (data) => {
    const response = await axiosInstance.put(`api/payment/${data.id}`, data);
    return response.data;
  };
export const makePaymentRequest = async (data) => {
    const response = await axiosInstance.post("api/create-payment", data);
    return response.data;
  };
export const verifyPaymentRequest = async (data) => {
    const response = await axiosInstance.post("api/verify-payment", data);
    return response.data;
  };
export const getAPaymentRequest = async (secureToken) => {
    const response = await axiosInstance.get(`api/payment/${secureToken}`);
    return response.data;
  };