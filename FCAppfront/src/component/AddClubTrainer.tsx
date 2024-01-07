import { useState } from "react";
import { getTrainers, getUsers } from "../api/datacontracts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { SystemSecurityUpdate } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from "moment";
import SelectClubAuto from "./SelectClubAuto";


export const AddClubTrainer = () => {

    const [club, setClub] = useState<{label:string, id: number}>({label:"Fitness World",id:151})
    const [name,setName] = useState<string>("")
    const [surname,setSurname] = useState<string>("")
    const [birth,setBirth] = useState<string>("")
    const [telefon, setTelefon] = useState<string>("")

    const navigate = useNavigate()

    const location = useLocation()
    const path = location.pathname
    const id = path.substring(16)


    const send = async (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();


        const trainer : getTrainers = {
            id_trener: 0,
            id_klub: Number(id),
            imie: name,
            nazwisko: surname,
            data_urodzenia: birth,
            telefon: telefon
        }

        console.log(trainer.data_urodzenia)
        
        await axios.post(
            "http://localhost:8080/trenerzy/save",
            trainer
        ).then((res: AxiosResponse<any, any>) =>{
            console.log(res)
            if(res.data === 'OK')
                navigate('/ctrainers/' + id )
            else{
                alert(res.data)
            }
        })
        console.log(trainer)

    }



    return(
        <div>
            <Button onClick={(e) => navigate('/ctrainers/' + id)}>Powrót</Button>
            <div className="formdiv">
                <form style={{width: "350px"}} >
                    
                    <TextField id="outlined-basic" sx={{marginBottom: "10px",}} label="Imię" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
                    <TextField id="outlined-basic" sx={{marginBottom: "10px"}} label="Nazwisko" value={surname} onChange={(e) => setSurname(e.target.value)} variant="outlined" />
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DatePicker sx={{marginBottom: "10px"}} label="Data urodzenia" 
                            value={birth}
                            onAccept={(val) => val && setBirth(val)}
                            />
                        </LocalizationProvider>
                    <TextField id="outlined-basic" sx={{marginBottom: "10px"}} label="Telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} variant="outlined" />
                    <br/>
                    <Button onClick={(e) => send(e)}> Dodaj </Button>
                </form>
            </div>
        </div>
    )
}