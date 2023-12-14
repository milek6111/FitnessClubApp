import { useEffect, useState } from "react"
import { getUsers } from "../api/datacontracts";
import { getUsersFn } from "../api/endpoints";


export const Users = () => {
    const [users, setUsers] = useState<getUsers[]>([])
    useEffect(()=>{
        fetch(getUsersFn.path).then(
            res => res.json()
        )
        .then(
            val => setUsers(val)
        )
    },[])
    
    
    return (
        <div className="div__table">
            <table>
                <tr>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Data Urodzenia</th>
                    <th>Telefon</th>
                </tr>
                {users.map(user => (
                    <tr>
                        <td>{user.imie}</td>
                        <td> {user.nazwisko} </td>
                        <td> {user.data_urodzenia} </td>
                        <td> {user.telefon} </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}