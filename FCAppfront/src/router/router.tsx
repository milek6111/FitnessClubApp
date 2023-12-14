import { createBrowserRouter } from "react-router-dom";
import { Users } from "../component/Users";
import { Clubs } from "../component/Clubs";
import { Trainers } from "../component/Trainers";

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
        path: "/clubs",
        element: <Clubs/>
    },
    {
        path: "/trainers",
        element: <Trainers/>
    },
    {
        path: "*",
        element: <div>not found</div>
    }
]
