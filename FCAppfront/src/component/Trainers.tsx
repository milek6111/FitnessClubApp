import { useEffect, useState } from "react"
import { getTrainers} from "../api/datacontracts";
import { deleteTrainer, getTrainerMoreInfo, getTrainersFn, getUsersFn } from "../api/endpoints";
import { Button } from "@mui/material";
import { TableModal } from "../partials/TableModal";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";


export const Trainers = () => {
    const [trainers, setTrainers] = useState<getTrainers[]>([])
    const [modalEntity, setModalEntity] = useState<getTrainers>();
    const [secondModalEntity, setSecondModalEntity] = useState<getTrainers>();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);


    const deleteT = () => {

        axios.delete(deleteTrainer.path + `?id=${secondModalEntity?.id_trener}`).then(
            response => {
                alert(response.data);
            }
        )
        //console.log("deleted")
    }



    const fetchTrainers = () => {
        fetch(getTrainersFn.path).then(
            res => res.json()
        )
        .then(
            val => setTrainers(val)
        )
    }

    useEffect(()=>{
        fetchTrainers()
        const interval = setInterval(() => {
            fetchTrainers()
        },10000) 
        return () =>{
            clearInterval(interval)
        }
    },[])


    const Membership = (props: {id: number}) =>{
        const [info, setInfo] = useState<{klub: string, zajecia: string}[]>([])

        useEffect(() =>{
            fetch(getTrainerMoreInfo.path + "?id=" + props.id)
            .then(res => res.json()).then(res =>(
                setInfo(res)
            ))
        },[])

        const content = info.map(obj => (
                <tr>
                    <td>{obj.klub}</td>
                    <td>{obj.zajecia}</td>
                </tr>
        ))

        if(info.length === 0){
            return(
                <div >
                    Trener obecnie nie prowadzi żadnych zajęć
                </div>
            )
        }
        
        
        return(
            <table>
                <tr>
                    <th>Nazwa klubu</th>
                    <th>Zajęcia</th>
                </tr> 
                {content}
            </table>
        )
    }

    

    const modalContent = modalEntity ? (


        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div>
            Prowadzone zajęcia:
            <Membership id={modalEntity.id_trener}/>
          </div>
          <div style={{ alignSelf: "end" }}>
            <Button onClick={() => setIsOpen(false)} variant="contained">
              Zamknij
            </Button>
          </div>
        </div>
      ) : null;

      const modalContent2 = secondModalEntity ? (


        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div>
            Czy napewno chcesz usunąć powyższego trenera z listy?
          </div>
          <div style={{ alignSelf: "end" }}>
            <Button onClick={() => {deleteT(); setIsOpen2(false)}} variant="contained">
              Tak
            </Button>
            <Button onClick={() => setIsOpen2(false)} variant="contained">
              Nie
            </Button>
          </div>
        </div>
      ) : null;
    
    
    return (
        <div>
            <Link to="form">
                <Button>Dodaj Trenera</Button>
            </Link>
            <table>
                <tr>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Data Urodzenia</th>
                    <th>Telefon</th>
                    <th>Szczegóły</th>
                    <th>Usuń</th>
                </tr>
                {trainers.map(trainer => (
                    <tr>
                        <td>{trainer.imie}</td>
                        <td> {trainer.nazwisko} </td>
                        <td> {trainer.data_urodzenia} </td>
                        <td> {trainer.telefon} </td>
                        <Button
                                onClick={() => {                  
                                    setModalEntity(trainer);
                                    setIsOpen(true);
                                }}
                                >
                                Więcej informacji
                        </Button>
                        <td>
                            <Button
                                onClick={() =>{
                                    setSecondModalEntity(trainer);
                                    setIsOpen2(true)
                                }}
                            >
                                <DeleteForeverIcon></DeleteForeverIcon>
                            </Button>
                        </td>
                        
                    </tr>
                ))}
            </table>
            <TableModal
                    header={modalEntity?.imie + " " + modalEntity?.nazwisko}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    {modalContent}
            </TableModal>
            <TableModal
                    header={secondModalEntity?.imie + " " + secondModalEntity?.nazwisko}
                    isOpen={isOpen2}
                    onClose={() => setIsOpen2(false)}
                >
                    {modalContent2}
            </TableModal>
        </div>
    )
}