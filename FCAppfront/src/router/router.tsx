import { createBrowserRouter } from "react-router-dom";
import { Users } from "../component/Users";
import { Clubs } from "../component/Clubs";
import { Trainers } from "../component/Trainers";
import { AddClub } from "../component/AddClub";
import { AddUser } from "../component/AddUser";

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
        path: "/clubs/form",
        element: <AddClub/>
    },
    {
        path: "/users/form",
        element: <AddUser/>
    },
    {
        path: "/clubs/*",
        element: <div>Siema</div>  
    },
    {
        path: "*",
        element: <div>not found</div>
    }
]
