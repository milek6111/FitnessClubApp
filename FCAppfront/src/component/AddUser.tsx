import { useState } from "react";
import { getUsers } from "../api/datacontracts";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { SystemSecurityUpdate } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
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


    const send = async (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
                <form style={{width: "250px"}} >
                    <TextField id="outlined-basic" sx={{marginBottom: "10px",}} label="Imię" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
                    <TextField id="outlined-basic" sx={{marginBottom: "10px"}} label="Nazwisko" value={surname} onChange={(e) => setSurname(e.target.value)} variant="outlined" />
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DatePicker sx={{marginBottom: "10px"}} label="Data urodzenia" 
                            value={birth}
                            onAccept={(val) => val && setBirth(val)}
                            />
                        </LocalizationProvider>
                    <TextField id="outlined-basic" sx={{marginBottom: "10px"}} label="Telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} variant="outlined" />
                    <Button onClick={(e) => send(e)}> Dodaj </Button>
                </form>
            </div>
        </div>
    )
}