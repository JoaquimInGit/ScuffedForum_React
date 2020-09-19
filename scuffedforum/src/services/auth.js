import { apiRequest } from "../configs/apiMiddleware";

export default {
    login: (body) =>  apiRequest("POST", "/user/login", body),
    register: (body) => apiRequest("POST", "/user/register", body)
};
