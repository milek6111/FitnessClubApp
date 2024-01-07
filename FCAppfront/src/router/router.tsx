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
import { ClubUsers } from "../component/ClubUsers";
import { ManageClubMembership } from "../component/ManageClubMembership";
import { ClubTrainers } from "../component/ClubTrainers";
import { AddClubTrainer } from "../component/AddClubTrainer";
import { ClubHarmonogram } from "../component/ClubHarmonogram";
import { AddClubClass } from "../component/AddClubClass";
import { AddClubTimeTable } from "../component/AddClubTimeTable";


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
        path: "/users:id",
        element: <div> Hello </div>
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
        path: "/classes",
        element: <Harmonogram/>
    },
    {
        path: "/classes/newClass",
        element: <AddClass/>

    },
    {
        path: "/classes/form",
        element: <AddTimeTable/>
    },
    {
        path: "/cusers/*",
        element: <ClubUsers />
    },
    {
        path: "/cusers/manage/*",
        element:  <ManageClubMembership/>
    },
    {
        path: "/ctrainers/*",
        element: <ClubTrainers/>
    },
    {
        path: "/ctrainers/form/*",
        element: <AddClubTrainer/>
    },
    {
        path: "/cclasses/*",
        element: <ClubHarmonogram/>
    },
    {
        path: "/cclasses/newClass/*",
        element: <AddClubClass/>
    },
    {
        path: "/cclasses/form/*",
        element: <AddClubTimeTable/>
    },
    {
        path: "*",
        element: <div>not found</div>
    }
]
