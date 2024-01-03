import { Button, TextField } from "@mui/material"
import SelectPerson from "./SelectPerson"
import SelectUserAuto from "./SelectUserAuto"
import { useState } from "react"
import SelectPeriodAuto from "./SelectPeriodAuto"
import SelectClubAuto from "./SelectClubAuto"
import axios, { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import SelectTrainerAuto from "./SelectTrainerAuto"




export const AddClass = () => {
    const [selectedTrainer, setSelectedTrainer] = useState<{label: string, id: number}>()
    const [name, setName] = useState<string>("")
    const [club, setClub] = useState<{label:string, id: number}>()

    const navigate = useNavigate()

    const send = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // const club : getClubs = {
        //     id_klub: 0,
        //     nazwa: name,
        //     miasto: city,
        //     telefon: telefon
        // }
        
        await axios.post(
            "http://localhost:8080/zajecia/save",
            {id_trener: selectedTrainer?.id, id_klub: club?.id, nazwa: name}
        ).then((res: AxiosResponse<any, any>) =>{
            console.log(res)
            if(res.data === 'Niepoprawny numer')
                alert(res.data)
            else{
                navigate('/classes')
            }
        })

    }

    return(
        <div>
            <Button onClick={(e) => navigate('/classes')}>Powrót</Button>
            <form >
                <h2>Dodaj nowe zajęcia</h2>
                <TextField id="outlined-basic" sx={{marginBottom: "10px",}} label="Nazwa" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
                <SelectClubAuto selectedClub={club} setSelectedClub={(label:string, id:number) => {setClub({label,id})}}/>
                <SelectTrainerAuto selectedClub={club} selectedTrainer={selectedTrainer} setSelectedTrainer={(label:string, id:number) => setSelectedTrainer({label,id})}/>
                <Button onClick={(e) => send(e)}>Zatwierdż</Button>
            </form>
        </div>
    )
}