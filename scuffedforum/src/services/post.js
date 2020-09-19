import { apiRequest } from "../configs/apiMiddleware";

export default {
getAll: () => apiRequest("GET", `/post`),
getOne: (id) => apiRequest("GET", `/post/${id}`),
create: (body) => apiRequest("POST", `/post`, body),
update: (id, body) => apiRequest("PUT", `/post/${id}`, body),
remove: (id) => apiRequest("DELETE", `/post/${id}`),

createComment: (id, body) => apiRequest("PUT", `/post/comment/${id}`, body),
removeComment: (id,body) => apiRequest("PUT", `/post/comment/rem/${id}`, body),

reset: () => apiRequest("PATCH", `/post`),
};