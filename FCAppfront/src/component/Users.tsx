import { useEffect, useState } from "react"
import { getUsers } from "../api/datacontracts";
import { getMembershipInfo, getUsersFn } from "../api/endpoints";
import { Link } from "react-router-dom";
import { Button, Tab } from "@mui/material";
import { TableModal } from "../partials/TableModal";
import SelectPerson from "./SelectPerson";


export const Users = () => {
    const [users, setUsers] = useState<getUsers[]>([])
    const [modalEntity, setModalEntity] = useState<getUsers>();
    const [isOpen, setIsOpen] = useState(false);


    const fetchUsers = () => {
        fetch(getUsersFn.path).then(
            res => res.json()
        )
        .then(
            val => setUsers(val)
        )
    }

    useEffect(()=>{
        fetchUsers()
        const interval = setInterval(() => {
            fetchUsers()
        },10000) 
        return () =>{
            clearInterval(interval)
        }
    },[])


    const Membership = (props: {id: number}) =>{
        const [membership, setMembership] = useState<{nazwa: string, data_zakupu: string, data_waznosci: string, oplata: number}[]>([])

        useEffect(() =>{
            fetch(getMembershipInfo.path + "?id=" + props.id)
            .then(res => res.json()).then(res =>{
                setMembership(res.sort((a:{nazwa: string, data_zakupu: string, data_waznosci: string, oplata: number},
                                        b: {nazwa: string, data_zakupu: string, data_waznosci: string, oplata: number}) => (
                                            new Date(a.data_waznosci) < new Date(b.data_waznosci)) ? 1 : -1 )
                                        )
            })
        },[])

        const content = membership.map(obj => (
                <tr>
                    <td>{obj.nazwa}</td>
                    <td>{obj.data_zakupu}</td>
                    <td>{obj.data_waznosci}</td>
                    <td>{obj.oplata}</td>
                </tr>
        ))

        if(membership.length === 0){
            return(
                <div >
                    Brak karnetów
                </div>
            )
        }

        
        
        return(
            <table>
                <tr>
                    <th>Nazwa klubu</th>
                    <th>Data zakupu</th>
                    <th>Data waznosci</th>
                    <th>Oplata</th>
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
            {/* TODO: Component fetchujacy historie harnetów po numerze ID */}
            Historia Karnetów:
            <Membership id={modalEntity.id_klient}/>
          </div>
          <div style={{ alignSelf: "end" }}>
            <Button onClick={() => setIsOpen(false)} variant="contained">
              Zamknij
            </Button>
          </div>
        </div>
      ) : null;
    
    
    return (
        <div>
            <Link to="form">
                <Button>Dodaj Osobę</Button>
            </Link>
            <Link to="manage">
                <Button >Zarządzaj karnetami</Button>
            </Link>
            <div className="div__table">
                <table>
                    <tr>
                        <th>Imie</th>
                        <th>Nazwisko</th>
                        <th>Data Urodzenia</th>
                        <th>Telefon</th>
                        <th>Historia Karnetów</th>
                    </tr>
                    {users.map(user => (
                        <tr>
                            <td>{user.imie}</td>
                            <td> {user.nazwisko} </td>
                            <td> {user.data_urodzenia} </td>
                            <td> {user.telefon} </td>
                            <td>
                                <Button
                                onClick={() => {                  
                                    setModalEntity(user);
                                    setIsOpen(true);
                                }}
                                >
                                Więcej informacji
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
            </div>
        </div>
    )
}