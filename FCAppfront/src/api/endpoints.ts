
const baseURL = "http://localhost:8080";

export const getUsersFn = {
    path: baseURL + "/klienci/listAll" ,
    method: "GET",
    content_type: "application/json"
}

export const getClubsFn = {
    path: baseURL + "/kluby/listAll" ,
    method: "GET",
    content_type: "application/json"
}

export const getTrainersFn = {
    path: baseURL + "/trenerzy/listAll" ,
    method: "GET",
    content_type: "application/json"
}

