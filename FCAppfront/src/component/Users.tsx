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
        <div>
            {users.map(user => (
                <div>
                    {user.imie}
                </div>
            ))}
        </div>
    )
}