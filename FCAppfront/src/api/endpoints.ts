
const baseURL = "http://localhost:8080";

export const getUsersFn = {
    path: baseURL + "/klienci/listAll" ,
    method: "GET",
    content_type: "application/json"
}

