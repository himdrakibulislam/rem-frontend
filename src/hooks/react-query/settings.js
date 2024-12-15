import { toast } from "react-toastify";
import axiosInstance from "../../lib/axios/axios";

import { useMutation, useQuery } from "@tanstack/react-query";

// settings
export const fetchEmailSettings = async () => {
  const response = await axiosInstance.get("api/get-email-settings");
  return response.data;
};
export const fetchAddonSettings = async () => {
  const response = await axiosInstance.get("api/get-addon-settings");
  return response.data;
};
export const updateAddonSettings = async ({data,settingsType}) => {
  const response = await axiosInstance.put(`/api/update-addon-settings/${settingsType}`,data);
  return response.data;
};

export const useEmailSettings = () => {
  return useQuery({
    queryKey: ["email-settings"],
    queryFn: fetchEmailSettings,
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10, 
  });
};

export const useAddonSettings = () => {
  return useQuery({
    queryKey: ["add-settings"],
    queryFn: fetchAddonSettings,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};
export const useAddonUpdateSettings = () => {
  return useMutation({
    mutationFn:  updateAddonSettings,
    onSuccess: (response) => {
      toast.success(response);
    },
    onError: (error) => {
      console.error("Error Updating Settings:", error.response?.data || error);
      toast.error("Failed to update settings.");
    },
  });
};