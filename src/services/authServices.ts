import axiosClient from '../utils/axiosclient';

export const sendOtp = (email: string) => {
  return axiosClient.post('/auth/sendOtp', { email });
};

export const verifyOtp = (email: string, otp: string) => {
  return axiosClient.post<{ token: string }>('/auth/verifyOtp', { email, otp });
};
