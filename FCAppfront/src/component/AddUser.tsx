import { useState } from "react";
import { getUsers } from "../api/datacontracts";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { SystemSecurityUpdate } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from "moment";


export const AddUser = () => {

    const [name,setName] = useState<string>("")
    const [surname,setSurname] = useState<string>("")
    const [birth,setBirth] = useState<string>("")
    const [telefon, setTelefon] = useState<string>("")

    const navigate = useNavigate()


    const send = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const user : getUsers = {
            id_klient: 0,
            imie: name,
            nazwisko: surname,
            data_urodzenia: birth,
            telefon: telefon
        }

        console.log(user.data_urodzenia)
        
        await axios.post(
            "http://localhost:8080/klienci/save",
            user
        ).then((res: AxiosResponse<any, any>) =>{
            console.log(res)
            if(res.data === 'OK')
                navigate('/clubs')
            else{
                alert(res.data)
            }
        })
        console.log(user)

    }



    return(
        <div>
            <Button onClick={(e) => navigate('/users')}>Powrót</Button>
            <div className="formdiv">
                <form onSubmit={(e) => send(e)}>
                    <label> Imię</label>
                    <input type="text" 
                        placeholder="Podaj imię"
                        name="imie"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /><br/>
                    <label> Nazwisko</label>
                    <input type="text" 
                        placeholder="Podaj nazwisko"
                        name="nazwisko"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    /><br/>
                    <label> Data urodzenia</label>
                    {/* <input type="date" 
                        placeholder="Podaj datę urodzenia"
                        name="birth"
                        value={birth}
                        onChange={(e) => setBirth(e.target.value)}
                    /><br/> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Wybierz datę" 
                            value={birth}
                            onAccept={(val) => val && setBirth(val)}
                            />
                        </LocalizationProvider>
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
        </div>
    )
}