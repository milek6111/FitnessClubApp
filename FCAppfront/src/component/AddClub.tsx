import { useState } from "react"
import { getClubs } from "../api/datacontracts"
import axios, { AxiosResponse } from 'axios'
import { Save } from "@mui/icons-material"
import { redirect, useNavigate } from "react-router-dom"

export const AddClub = () =>{
    const [name,setName] = useState<string>("")
    const [city,setCity] = useState<string>("")
    const [telefon, setTelefon] = useState<string>("")

    const navigate = useNavigate()


    const send = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <div className="formdiv">
            <form onSubmit={(e) => send(e)}>
                <label> Nazwa klubu</label>
                <input type="text" 
                    placeholder="Podaj nazwe klubu"
                    name="nazwa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br/>
                <label> Miasto</label>
                <input type="text" 
                    placeholder="Podaj miasto"
                    name="miasto"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                /><br/>
                <label> Telefon </label>
                <input type="text" 
                    placeholder="Podaj Telefon kontaktowy"
                    name="telefon"
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                /><br/>
                <input className="submit" type="submit" value="Dodaj"/>
            </form>
        </div>
    )
}