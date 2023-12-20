import { createBrowserRouter } from "react-router-dom";
import { Users } from "../component/Users";
import { Clubs } from "../component/Clubs";
import { Trainers } from "../component/Trainers";
import { AddClub } from "../component/AddClub";
import { AddUser } from "../component/AddUser";
import { ManageMembership } from "../component/ManageMembership";

export const paths = [
    {
        path: "/",
        element: <h1 style={{marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>Witamy w aplikacji </h1>
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
        path: "/users/manage",
        element: <ManageMembership/>
    },
    {
        path: "*",
        element: <div>not found</div>
    }
]
