const serverURL = "http://localhost:3001";

export const apiRequest = (method, route, body) => {
    let currentUser = sessionStorage.getItem("user");
    return new Promise((resolve, reject) => {
        fetch(serverURL + route, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(currentUser && { Authorization: JSON.parse(currentUser).token }),
            },
            ...(body && { body: JSON.stringify(body) }),
        })
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => {
                console.error(`error ${method} ${route}: ${err.message}`);
                reject(err);
            });
    });
};