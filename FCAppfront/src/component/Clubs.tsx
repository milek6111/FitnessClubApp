import { useEffect, useState } from "react";
import { getClubs } from "../api/datacontracts";
import { getClubsFn, getClubsMoreInfo} from "../api/endpoints";
import { Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { TableModal } from "../partials/TableModal";
import axios, { AxiosResponse } from "axios";

export const Clubs = () => {
  const [clubs, setClubs] = useState<getClubs[]>([]);
  const [modalEntity, setModalEntity] = useState<getClubs>();
  const [isOpen, setIsOpen] = useState(false);


  const fetchClubs = () => {
    fetch(getClubsFn.path)
    .then((res) => res.json())
    .then((val) => setClubs(val));
  }

  useEffect(() => {
    fetchClubs()
    const interval = setInterval(() => {
        fetchClubs()
    },10000) 
    return () =>{
        clearInterval(interval)
    }
  }, []);


  const Info = (props: {id: number}) =>{

    const [clubinfo, setClubinfo] = useState<{ liczba_klientow: number, liczba_trenerow:number, miasto: string,nazwa:string, telefon: string,}>()

    useEffect(() =>{
      fetch( getClubsMoreInfo.path + "?id=" +props.id)
      .then(res => res.json()).then(res => {
        setClubinfo(res) 
      })
    },[])
    

    return(
      <div>
        <p>Miasto: {clubinfo?.miasto}</p>
        <p>Telefon: {clubinfo?.telefon}</p>
        <p>Liczba klientów: {clubinfo?.liczba_klientow}</p>
        <p>Liczba trenerów: {clubinfo?.liczba_trenerow}</p>
      </div>
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
        
        <Info id={modalEntity.id_klub}/>

      </div>
      <div style={{ alignSelf: "end" }}>
        <Button onClick={() => setIsOpen(false)} variant="contained">
          Zamknij
        </Button>
      </div>
    </div>
  ) : null;

  const clubsTable = clubs.map((club) => (
    <tr>
      {/* <td>{club.nazwa}</td>
      <td>{club.miasto}</td>
      <td>{club.telefon}</td> */}
      <td>
        <Button
          onClick={() => {
            setModalEntity(club);
            setIsOpen(true);
          }}
        >
          {/* Więcej informacji */}
          {club.nazwa}
        </Button>
      </td>
    </tr>
  ))

  return (
    <div>
      <Link to="form">
        <Button>Dodaj Klub</Button>
      </Link>
      <table className="clubs">
        <tr>
          <th className="ClubName">Nazwa Klubu</th>
          {/* <th>Lokalizacja</th>
          <th>Telefon kontaktowy</th> */}
          {/* <th>Szczegóły</th> */}
        </tr>

        {clubsTable}
      </table>
      <TableModal
        header={modalEntity?.nazwa ?? ""}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {modalContent}
      </TableModal>
    </div>
  );
};
