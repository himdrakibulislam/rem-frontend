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

export function useAuthMe() {
    return useQuery({
        queryKey: ['getme'], 
        queryFn: fetchMe,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

