import { useState } from "react"
import { getClubs } from "../api/datacontracts"
import axios, { AxiosResponse } from 'axios'
import { Save } from "@mui/icons-material"
import { redirect, useNavigate } from "react-router-dom"
import { Button, TextField } from "@mui/material"

export const AddClub = () =>{
    const [name,setName] = useState<string>("")
    const [city,setCity] = useState<string>("")
    const [telefon, setTelefon] = useState<string>("")

    const navigate = useNavigate()


    const send = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const club : getClubs = {
            id_klub: 0,
            nazwa: name,
            miasto: city,
            telefon: telefon
        }
        
        await axios.post(
            "http://localhost:8080/kluby/save",
            club
        ).then((res: AxiosResponse<any, any>) =>{
            console.log(res)
            if(res.data === 'Niepoprawny numer')
                alert(res.data)
            else{
                navigate('/clubs')
            }
        })
        console.log(club)

    }



    return(
        <div>
            <Button onClick={(e) => navigate('/clubs')}>Powrót</Button>
            <div className="formdiv">
                <form style={{width: "250px"}} >
                    <TextField id="outlined-basic" sx={{marginBottom: "10px",}} label="Nazwa klubu" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
                    <TextField id="outlined-basic" sx={{marginBottom: "10px",}} label="Miasto" value={city} onChange={(e) => setCity(e.target.value)} variant="outlined" />
                    <TextField id="outlined-basic" sx={{marginBottom: "10px",}} label="Telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} variant="outlined" />
                    <Button onClick={(e) => send(e)}>Dodaj</Button>
                </form>
            </div>
        </div>
    )
}