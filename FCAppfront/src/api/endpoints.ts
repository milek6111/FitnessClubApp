
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

export const getClubsMoreInfo = {
    path: baseURL + "/kluby/More",
    method: "GET",
    content_type: "application/json"
}

export const getMembershipInfo = {
    path: baseURL + "/klienci/karnety/info",
    method: "GET",
    content_type: "application/json"
}


export const getTrainerMoreInfo = {
    path: baseURL + "/trenerzy/More",
    method: "GET",
    content_type: "application/json"
}

export const getClassesInfo = {
    path: baseURL + "/harmonogram/getAll",
    method: "GET",
    content_type: "application/json"
}

export const getClassesThisWeekInfo = {
    path: baseURL + "/harmonogram/thisWeek",
    method: "GET",
    content_type: "application/json"
}

export const getAllClasses = {
    path: baseURL + "/zajecia/all",
    method: "GET",
    content_type: "application/json"
}

