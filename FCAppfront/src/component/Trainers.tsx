import { useEffect, useState } from "react"
import { getTrainers} from "../api/datacontracts";
import { getTrainersFn, getUsersFn } from "../api/endpoints";


export const Trainers = () => {
    const [trainers, setTrainers] = useState<getTrainers[]>([])
    useEffect(()=>{
        fetch(getTrainersFn.path).then(
            res => res.json()
        )
        .then(
            val => setTrainers(val)
        )
    },[])
    
    
    return (
        <div>
            
            <table>
                <tr>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Data Urodzenia</th>
                    <th>Telefon</th>
                </tr>
                {trainers.map(trainer => (
                    <tr>
                        <td>{trainer.imie}</td>
                        <td> {trainer.nazwisko} </td>
                        <td> {trainer.data_urodzenia} </td>
                        <td> {trainer.telefon} </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}