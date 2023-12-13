import { createBrowserRouter } from "react-router-dom";
import { Users } from "../component/Users";

export const paths = [
    {
        path: "/",
        element: <div> Hello World </div>
    },
    {
        path: "/users",
        element: <Users/>
    },
    {
        path: "*",
        element: <div>not found</div>
    }
]
