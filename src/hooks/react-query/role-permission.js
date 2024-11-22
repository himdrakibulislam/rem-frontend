import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios/axios";

export const getAllRolesWithPermissions = async () => {
  const response = await axiosInstance.get("api/roles");
  return response.data;
};

export const createRole = async (roleData) => {
  const response = await axiosInstance.post("api/roles", roleData);
  return response.data;
};

export const updateRole = async (roleId, roleData) => {
  const response = await axiosInstance.put(`api/roles/${roleId}`, roleData);
  return response.data;
};

export const getAllPermissions = async () => {
  const response = await axiosInstance.get("api/permissions");
  return response.data;
};

export const assignPermissionsToRole = async (roleId, permissions) => {
  const response = await axiosInstance.post(
    `api/roles/${roleId}/assign-permissions`,
    permissions
  );
  return response.data;
};
export const updateRoleRequest = async ({ id, role }) => {
  await axiosInstance.put(`api/users/${id}/role`, { role });
};
// react query
export function useAllPermissions() {
  return useQuery({
    queryKey: ["getAllPermission"],
    queryFn: getAllPermissions,
  });
}
export function useAllRolesWithPermissions() {
  return useQuery({
    queryKey: ["rolesWithPermissions"],
    queryFn: getAllRolesWithPermissions,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 5 * 60 * 1000, 
  });
}

// settings
export const fetchSettings = async () => {
  const response = await axiosInstance.get("api/settings");
  return response.data;
};
export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    cacheTime: 1000 * 60 * 10, // Keep data in memory for 10 minutes
  });
};

export const updateSettingsRequest = async (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "logo" && value instanceof File) {
      // Only append the logo if it's a valid file (image)
      formData.append("settings[logo]", value);
    } else if (value !== undefined && value !== null) {
      // Only append other properties that are not null or undefined
      formData.append(`settings[${key}]`, value);
    }
  });

  const response = await axiosInstance.post("/api/settings", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // Return the response data if needed
};
