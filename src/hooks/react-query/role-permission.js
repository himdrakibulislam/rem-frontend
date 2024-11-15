import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios/axios";

export const getAllRolesWithPermissions = async () => {
    const response = await axiosInstance.get('api/roles');
    return response.data;
  };
  
  export const createRole = async (roleData) => {
    const response = await axiosInstance.post('api/roles', roleData);
    return response.data;
  };
  
  export const updateRole = async (roleId, roleData) => {
    const response = await axiosInstance.put(`api/roles/${roleId}`, roleData);
    return response.data;
  };
  
  export const getAllPermissions = async () => {
    const response = await axiosInstance.get('api/permissions');
    return response.data;
  };
  
  export const assignPermissionsToRole = async (roleId, permissions) => {
    const response = await axiosInstance.post(`api/roles/${roleId}/assign-permissions`, permissions);
    return response.data;
  };
  // react query 
  export function useAllPermissions() {
    return useQuery({
        queryKey: ['getAllPermission'], 
        queryFn: getAllPermissions
    });
}