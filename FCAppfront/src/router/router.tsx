import { createBrowserRouter } from "react-router-dom";
import { Users } from "../component/Users";
import { Clubs } from "../component/Clubs";
import { Trainers } from "../component/Trainers";
import { AddClub } from "../component/AddClub";
import { AddUser } from "../component/AddUser";
import { ManageMembership } from "../component/ManageMembership";

import { AddTrainer } from "../component/AddTrainer";
import { Harmonogram } from "../component/Hamonogram";
import { AddClass } from "../component/AddClass";
import { AddTimeTable } from "../component/AddTimeTable";


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
        path: "/trainers/form",
        element: <AddTrainer/>
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
        path: "classes",
        element: <Harmonogram/>
    },
    {
        path: "classes/newClass",
        element: <AddClass/>

    },
    {
        path: "classes/form",
        element: <AddTimeTable/>
    },
    {
        path: "*",
        element: <div>not found</div>
    }
]
