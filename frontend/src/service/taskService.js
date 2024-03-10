import { axiosInstanceAuth } from "../axios/axiosInstance";
import { API_URL } from "../config";


const createTask = async (data) => {
    return await axiosInstanceAuth.post(API_URL.createTask, data)
}

const getTask = async () => {
    return await axiosInstanceAuth.post(API_URL.taskList)
}

const updateTask = async (data) => {
    return await axiosInstanceAuth.put(API_URL.updateTask, data)
}

const deleteTask = async (id) => {
    return await axiosInstanceAuth.delete(`${API_URL.deleteTask}/${id}`)
}


const getTaskCategory = async () => {
    return await axiosInstanceAuth.get(API_URL.getCategory)
}


const getTaskPriority = async () => {
    return await axiosInstanceAuth.get(API_URL.getPriority)
}


export const taskService = {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getTaskCategory,
    getTaskPriority
}