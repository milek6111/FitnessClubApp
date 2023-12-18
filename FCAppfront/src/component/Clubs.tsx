import { useEffect, useState } from "react";
import { getClubs } from "../api/datacontracts";
import { getClubsFn } from "../api/endpoints";
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

//   fetch("http://localhost:8080/kluby/More?id=151")
//   .then(res => res.json()).then(res => console.log(res))


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
        <p>{modalEntity.id_klub}</p>
        <p>{modalEntity.miasto}</p>
        <p>{modalEntity.telefon}</p>
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
      <td>{club.nazwa}</td>
      <td>{club.miasto}</td>
      <td>{club.telefon}</td>
      <td>
        <Button
          onClick={() => {
            setModalEntity(club);
            setIsOpen(true);
          }}
        >
          Więcej informacji
        </Button>
      </td>
    </tr>
  ))

  return (
    <div>
      <Link to="form">
        <Button>Dodaj Klub</Button>
      </Link>
      <table>
        <tr>
          <th>Nazwa Klubu</th>
          <th>Lokalizacja</th>
          <th>Telefon kontaktowy</th>
          <th>Szczegóły</th>
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
