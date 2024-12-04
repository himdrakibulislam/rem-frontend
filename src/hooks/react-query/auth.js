import { useQuery } from '@tanstack/react-query';
import axios from '../../lib/axios/axios';


const fetchMe = async () => {
    const response = await axios.get('/api/auth/me'); 
    return response.data;
};
export const loginWithEmailRequest = async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials); 
    return response.data; // Return the response data
};
export const registerUserRequest = async (credentials) => {
    const response = await axios.post('/api/auth/register', credentials); 
    return response.data; // Return the response data
};
export const logoutRequest = async () => {
    const response = await axios.post('/api/auth/logout'); 
    localStorage.removeItem("token");
    return response.data;
};
export const ForgotPasswordRequest = async (credentials) => {
    const response = await axios.post('/api/auth/password/forgot',credentials); 
    return response.data;
};
export const ResetPasswordRequest = async (credentials) => {
    const response = await axios.post('/api/auth/password-reset',credentials); 
    return response.data;
};
export const changePasswordRequest = async (credentials) => {
    const response = await axios.post('/api/auth/password/change',credentials); 
    return response.data;
};
export const signUpDataRequest = async (credentials) => {
    const response = await axios.get('/api/auth/signup-data',credentials); 
    return response.data;
};
export const myPropertiesRequest = async () => {
    const response = await axios.get('/api/auth/my-properties'); 
    return response.data;
};

export function useAuthMe() {
    return useQuery({
        queryKey: ['getme'], 
        queryFn: fetchMe,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
export function useMyProperties() {
    return useQuery({
        queryKey: ['myproperties'], 
        queryFn: myPropertiesRequest,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// signup-data
export function useSignUpData() {
    return useQuery({
        queryKey: ['getSignUpData'], 
        queryFn: signUpDataRequest,
        staleTime: 10 * 60 * 1000, // 5 minutes
    });
}
// users details 
export const useUserDetails = (userId) => {
    return useQuery({
      queryKey: ['userDetails', userId],
      queryFn: () => axios.get(`api/get-user/${userId}`).then((res) => res.data),
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });
  };
//   dashboard_statistics
export const useDashboardStatistics = (options = {}) => { 
    return useQuery({
      queryKey: ['dashboard_statistics'],
      queryFn: () => axios.get(`api/dashboard/statistics`).then((res) => res.data),
      staleTime: 5 * 60 * 1000, 
      enabled: options.enabled ?? false, // Default to true if not provided
    });
  };