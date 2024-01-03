import { Button } from "@mui/material"
import WeekPicker from "./WeekPicker"
import axios from "axios"
import { Block, FeedTwoTone } from "@mui/icons-material"
import { getClassesInfo, getClassesThisWeekInfo } from "../api/endpoints"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const Harmonogram = () => {
    const [allclass, setAllClass] = useState<boolean>(true)
    const [allvis, setAllVis] = useState<boolean>(false)
    const [weekvis, setweekVis] = useState<boolean>(false)
    const [classes, setClasses] = useState<{nazwa: string, klub: string, trener: string, data: string, start: string, end: string}[]>([])
    

    const fetchClasses = () =>{
        fetch(getClassesInfo.path).then(
            res => res.json()
        )
        .then(
            val => setClasses(val)
        )
    }

    const fetchAllClasses = () =>{
        fetch(getClassesInfo.path).then(
            res => res.json()
        )
        .then(
            val => setClasses(val)
        )
    }

    const fetchClassesThisWeek = () => {
        fetch(getClassesThisWeekInfo.path)
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
            <Link to="newClass">
                <Button>Dodaj nowe zajęcia</Button>
            </Link>
            <Link to="form">
                <Button>Dodaj termin zajęć</Button>
            </Link>
            <div>
                {allclass && <table id="allClasses">
                    <th>nazwa zajęć</th>
                    <th>klub</th>
                    <th>trener</th>
                    
                    {classes.map( element => (
                        <tr>
                            <td>{element.nazwa}</td>
                            <td>{element.klub}</td>
                            <td>{element.trener}</td>
                            
                        </tr>
                    ))}
                </table>}
                {allvis && <table id="all">
                    <th>nazwa zajęć</th>
                    <th>klub</th>
                    <th>trener</th>
                    <th>data</th>
                    <th>początek</th>
                    <th>koniec</th>
                    {classes.map( element => (
                        <tr>
                            <td>{element.nazwa}</td>
                            <td>{element.klub}</td>
                            <td>{element.trener}</td>
                            <td>{element.data}</td>
                            <td>{element.start}</td>
                            <td>{element.end}</td>
                        </tr>
                    ))}
                </table>}
                {weekvis && <table id="week">
                    <td>nazwa zajęć</td>
                    <th>klub</th>
                    <th>trener</th>
                    <th>dzień</th>
                    <th>początek</th>
                    <th>koniec</th>
                    {classes.map( element => (
                        <tr>
                            <td>{element.nazwa}</td>
                            <td>{element.klub}</td>
                            <td>{element.trener}</td>
                            <td>{element.data}</td>
                            <td>{element.start}</td>
                            <td>{element.end}</td>
                        </tr>
                    ))}
                </table>}
            </div>
        </div>
    )
}