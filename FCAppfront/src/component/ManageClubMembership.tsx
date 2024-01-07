import { Button } from "@mui/material"
import SelectPerson from "./SelectPerson"
import SelectUserAuto from "./SelectUserAuto"
import { useState } from "react"
import SelectPeriodAuto from "./SelectPeriodAuto"
import SelectClubAuto from "./SelectClubAuto"
import axios, { AxiosResponse } from "axios"
import { useLocation, useNavigate } from "react-router-dom"




export const ManageClubMembership = () => {
    const [selectedClient, setSelectedClient] = useState<{label: string, id: number}>()
    const [period, setPeriod] = useState<{label:string, days: number}>()
    const [club, setClub] = useState<{label:string, id: number}>()

    const navigate = useNavigate()

    const location = useLocation()
        const path = location.pathname
        const id = path.substring(15)

    const send = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        

        // const club : getClubs = {
        //     id_klub: 0,
        //     nazwa: name,
        //     miasto: city,
        //     telefon: telefon
        // }
        
        await axios.post(
            "http://localhost:8080/klienci/karnety/save",
            {id_klient: selectedClient?.id, days: period?.days, id_klub: Number(id)}
        ).then((res: AxiosResponse<any, any>) =>{
            console.log(res)
            if(res.data === 'Niepoprawny numer')
                alert(res.data)
            else{
                navigate('/cusers/' + id)
            }
        })

    }

    return(
        <div>
            <Button onClick={(e) => navigate('/cusers/' + id)}>Powrót</Button>
            <form >
                <h2>Aktywacja karnetu</h2>
                <SelectUserAuto selectedClient={selectedClient} setSelectedClient={(label:string, id:number) => setSelectedClient({label,id})}/>
                <SelectPeriodAuto selectedPeriod={period} setSelectedPeriod={(label: string, days: number) => setPeriod({label,days})} />
                <Button onClick={(e) => send(e)}>Zatwierdż</Button>
            </form>
        </div>
    )
}