import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const getRequest = async (endPoint, config = {}) => {
  try {
    const response = await axiosInstance.get(endPoint, config);
    return response.data;
  } catch (error) {
    console.log(error)
     throw error
  }
}

const postRequest = async (endPoint, data = {}, config = {}) => {
  try {
    const response = await axiosInstance.post(endPoint, data, config);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error
  }
}


export const putRequest = async (endpoint, data = {}, config = {}) => {
  try {
    const response = await axiosInstance.put(endpoint, data, config);
    return response.data;
  } catch (error) {
    console.log(error);
     throw error
  }
};


export const deleteRequest = async (endpoint, config = {}) => {
  try {
    const response = await axiosInstance.delete(endpoint, config);
    return response.data;
  } catch (error) {
    console.log(error);
     throw error
  }
};
export { getRequest, postRequest }