import { Button } from "@mui/material"
import WeekPicker from "./WeekPicker"
import axios from "axios"
import { Block, FeedTwoTone } from "@mui/icons-material"
import { getAllClasses, getAllClassesInfo, getClassesInfo, getClassesThisWeekInfo, getClubAllClassesInfo, getClubClassesThisWeekInfo, getCluballClasses } from "../api/endpoints"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"


export const ClubHarmonogram = () => {
    const [allclass, setAllClass] = useState<boolean>(true)
    const [allvis, setAllVis] = useState<boolean>(false)
    const [weekvis, setweekVis] = useState<boolean>(false)
    const [classes, setClasses] = useState<{nazwa: string, klub: string, trener: string, data: string, start: string, end: string}[]>([])
    
    const location = useLocation()
    const path = location.pathname
    const id = path.substring(10)

    const fetchClasses = () =>{
        fetch(getCluballClasses.path + `?id=${id}`).then(
            res => res.json()
        )
        .then(
            val => setClasses(val)
        )
    }

    const fetchAllClasses = () =>{
        fetch(getClubAllClassesInfo.path + `?id=${id}`).then(
            res => res.json()
        )
        .then(
            val => setClasses(val)
        )
    }

    const fetchClassesThisWeek = () => {
        fetch(getClubClassesThisWeekInfo.path + `?id=${id}`)
        .then(
            res => res.json()
        )
        .then(
            val => setClasses(val)
        )
    }

    const allClasses = () =>{
        fetchAllClasses()
        
        setAllClass(true)
        setAllVis(false)
        setweekVis(false)
    }

    const showClasses = () => {
        fetchClasses()

        setAllClass(false)
        setAllVis(true)
        setweekVis(false)
    }

    const thisWeek = () => {
        fetchClassesThisWeek()

        setAllClass(false)
        setAllVis(false)
        setweekVis(true)     
    }

    useEffect(()=>{
        fetchAllClasses()
    },[])

    
    return(
        <div>
            <Button onClick={allClasses}>Wszystkie zajęcia</Button>
            <Button onClick={thisWeek}>Zajęcia w tym tygodniu</Button>
            <Button onClick={showClasses}> Historia zajęć</Button>
            <Link to={`${path.substring(0,10)}newClass/${id}`}>
                <Button>Dodaj nowe zajęcia</Button>
            </Link>
            <Link to={`${path.substring(0,10)}form/${id}`}>
                <Button>Dodaj termin zajęć</Button>
            </Link>
            <div>
                {allclass && <table id="allClasses">
                    <th>nazwa zajęć</th>
                    <th>trener</th>
                    
                    {classes.map( element => (
                        <tr>
                            <td>{element.nazwa}</td>
                            <td>{element.trener}</td>
                            
                        </tr>
                    ))}
                </table>}
                {allvis && <table id="all">
                    <th>nazwa zajęć</th>
                    <th>trener</th>
                    <th>data</th>
                    <th>początek</th>
                    <th>koniec</th>
                    {classes.map( element => (
                        <tr>
                            <td>{element.nazwa}</td>
                            <td>{element.trener}</td>
                            <td>{element.data}</td>
                            <td>{element.start}</td>
                            <td>{element.end}</td>
                        </tr>
                    ))}
                </table>}
                {weekvis && classes.length !=0 &&<table id="week">
                    <th>nazwa zajęć</th>
                    <th>trener</th>
                    <th>dzień</th>
                    <th>początek</th>
                    <th>koniec</th>
                    {classes.map( element => (
                        <tr>
                            <td>{element.nazwa}</td>
                            <td>{element.trener}</td>
                            <td>{element.data}</td>
                            <td>{element.start}</td>
                            <td>{element.end}</td>
                        </tr>
                    ))}
                </table>}
                {weekvis && classes.length == 0 &&
                    <h1 style={{textAlign: "center"}}>Brak zajęć w tym tygodniu</h1>
                }
            </div>
        </div>
    )
}