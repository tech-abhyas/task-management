import { axiosInstance, axiosInstanceAuth } from "../axios/axiosInstance";
import { API_URL } from "../config";



const register = async (data) => {
    return await axiosInstance.post(API_URL.register, data)
}

const emailVerify = async (data) => {
    return await axiosInstance.put(`${API_URL.emailVerify}${data}`)
}

const resetPassword = async (data) => {
    return await axiosInstance.post(API_URL.resetPassword, data)
}

const updatePassword = async (data) => {
    const { password, confirmPassword, token } = data
    return await axiosInstance.put(`${API_URL.updatePassword}/${token}`, { password, confirmPassword })
}

const login = async (data) => {
    return await axiosInstance.post(`${API_URL.login}`, data)
}

const logout = async () => {
    return await axiosInstanceAuth.post(`${API_URL.logout}`)
}



export const authService = {
    register,
    emailVerify,
    resetPassword,
    updatePassword,
    login,
    logout
}
