import { Button, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material"
import SelectPerson from "./SelectPerson"
import SelectUserAuto from "./SelectUserAuto"
import { useState } from "react"
import SelectPeriodAuto from "./SelectPeriodAuto"
import SelectClubAuto from "./SelectClubAuto"
import axios, { AxiosResponse } from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import SelectTrainerAuto from "./SelectTrainerAuto"
import SelectClassAuto from "./SelectClassAuto"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"




export const AddClubTimeTable = () => {

    const location = useLocation()
    const path = location.pathname
    const id = path.substring(15)

    const [club, setClub] = useState<{label:string, id: number}>({label: " ", id: Number(id)})
    const [clas, setClass] = useState<{label:string, id: number}>()
    const [classDate, setClassDate] = useState<string>("")
    const [chosenTime, setChosenTime] = useState<string>("08:00:00")

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
            "http://localhost:8080/harmonogram/save",
            {id_klub: club.id, id_zajecia: clas?.id, data: classDate, chosenTime: chosenTime}
        ).then((res: AxiosResponse<any, any>) =>{
            console.log(res)
            if(res.data !== 'OK')
                alert(res.data)
            else{
                navigate('/classes')
            }
        })

    }

    return(
        <div>
            <Button onClick={(e) => navigate('/cclasses/' + id)}>Powrót</Button>
            <form >
                <h2>Dodaj nowy termin zajęć</h2>
                {/* <SelectClubAuto selectedClub={club} setSelectedClub={(label:string, id:number) => {setClub({label,id})}}/> */}
                <SelectClassAuto selectedClub={club} selectedClass={clas} setSelectedClass={(label:string, id:number) => {setClass({label,id})}} ></SelectClassAuto>
                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DatePicker sx={{marginBottom: "10px"}} label="Data zajęć" 
                            value={classDate}
                            onAccept={(val) => val && setClassDate(val)}
                            />
                </LocalizationProvider>
                <p>Przedział czasowy</p>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="08:00:00"
                    value={chosenTime}
                    name="radio-buttons-group"
                    onChange={(e,val) => {setChosenTime(val)}}
                >
                    <FormControlLabel value="08:00:00" control={<Radio />} label="8:00-9:30" />
                    <FormControlLabel value="10:00:00" control={<Radio />} label="10:00-11:30" />
                    <FormControlLabel value="12:00:00" control={<Radio />} label="12:00-13:30" />
                    <FormControlLabel value="14:00:00" control={<Radio />} label="14:00-15:30" />
                    <FormControlLabel value="16:00:00" control={<Radio />} label="16:00-17:30" />
                </RadioGroup>
                <Button onClick={(e) => send(e)}>Zatwierdż</Button>
            </form>
        </div>
    )
}