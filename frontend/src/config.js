let api_base_url = "http://localhost:5000/api/v1"

export const API_URL = {
    // auth api
    register: `${api_base_url}/user/register`,
    emailVerify: `${api_base_url}/user/email/verify/`,
    resetPassword: `${api_base_url}/user/password/forgot`,
    updatePassword: `${api_base_url}/user/password/reset`,
    login: `${api_base_url}/user/login`,
    logout: `${api_base_url}/user/logout`,

    // task api
    createTask: `${api_base_url}/task/create`,
    taskList: `${api_base_url}/task/task-list`,
    updateTask: `${api_base_url}/task/update`,
    deleteTask: `${api_base_url}/task/delete`,

    // get category
    getCategory: `${api_base_url}/category/get-category`,

    // get priority
    getPriority: `${api_base_url}/priority/get-priority`
}

