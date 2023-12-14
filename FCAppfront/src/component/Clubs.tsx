import { useEffect, useState } from "react";
import { getClubs } from "../api/datacontracts";
import { getClubsFn } from "../api/endpoints";



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
            <table>
                <tr>
                    <th>Nazwa Klubu</th>
                    <th>Lokalizacja</th>
                    <th>Telefon kontaktowy</th>
                </tr>
                
                {clubs.map(club=>(
                    <tr>
                        <td>{club.nazwa}</td>
                        <td>{club.miasto}</td>
                        <td>{club.telefon}</td>
                    </tr>
                ))}

            </table>
        </div>
    );
}