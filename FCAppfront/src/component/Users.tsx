import { useEffect, useState } from "react"
import { getUsers } from "../api/datacontracts";
import { getUsersFn } from "../api/endpoints";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { TableModal } from "../partials/TableModal";


export const Users = () => {
    const [users, setUsers] = useState<getUsers[]>([])
    const [modalEntity, setModalEntity] = useState<getUsers>();
    const [isOpen, setIsOpen] = useState(false);


    useEffect(()=>{
        fetch(getUsersFn.path).then(
            res => res.json()
        )
        .then(
            val => setUsers(val)
        )
    },[])

    

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
            cokolwiek
    
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
                                    //TODO
                    
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
                    header={modalEntity?.imie + " " + modalEntity?.nazwisko ?? ""}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    {modalContent}
                </TableModal>
            </div>
        </div>
    )
}