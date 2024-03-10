import axios from "axios";

export const axiosInstanceAuth = axios.create()
export default axiosInstanceAuth.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('tk')}`;

export const axiosInstance = axios.create();