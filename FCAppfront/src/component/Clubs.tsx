import { useEffect, useState } from "react";
import { getClubs } from "../api/datacontracts";
import { getClubsFn } from "../api/endpoints";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";



export const Clubs = () => {
    const [clubs, setClubs] = useState<getClubs[]>([])

    useEffect(()=>{
        fetch(getClubsFn.path).then(
            res => res.json()
        )
        .then(
            val => setClubs(val)
        )
    },[])

    return(
        <div>
            <Link to = "form">
                    <Button>Dodaj Klub</Button>
            </Link>
            <table>
                
                <tr>
                    <th>Nazwa Klubu</th>
                    <th>Lokalizacja</th>
                    <th>Telefon kontaktowy</th>
                    <th>Szczegóły</th>
                </tr>
                
                {clubs.map(club=>(
                    <tr>
                        <td>{club.nazwa}</td>
                        <td>{club.miasto}</td>
                        <td>{club.telefon}</td>
                        <td>
                            <Link to = {club.nazwa}>
                                <Button>Więcej informacji</Button>
                            </Link>                           
                        </td>
                    </tr>
                ))}

            </table>
        </div>
    );
}