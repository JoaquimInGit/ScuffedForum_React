import { apiRequest } from "../configs/apiMiddleware";

export default {
getAll: () => apiRequest("GET", `/category`),
create: (body) => apiRequest("POST", `/category`, body),
remove: (id) => apiRequest("DELETE", `/category/${id}`),

reset: () => apiRequest("PATCH", `/post`),
};