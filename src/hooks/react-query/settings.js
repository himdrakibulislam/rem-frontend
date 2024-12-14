import axiosInstance from "../../lib/axios/axios";

import { useQuery } from "@tanstack/react-query";

// settings
export const fetchEmailSettings = async () => {
    const response = await axiosInstance.get("api/get-email-settings");
    return response.data;
  };

export const useEmailSettings = () => {
    return useQuery({
      queryKey: ["email-settings"],
      queryFn: fetchEmailSettings,
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      cacheTime: 1000 * 60 * 10, // Keep data in memory for 10 minutes
    });
  };