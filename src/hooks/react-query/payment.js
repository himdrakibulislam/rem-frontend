import axiosInstance from "../../lib/axios/axios";

export const updatePaymentRequest = async (data) => {
    const response = await axiosInstance.put(`api/payment/${data.id}`, data);
    return response.data;
  };