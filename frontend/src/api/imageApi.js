import axiosInstance from './axiosInstance';

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance.post('/cloudinary/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};