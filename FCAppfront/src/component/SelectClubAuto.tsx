import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getClubsFn, getUsersFn } from '../api/endpoints';
import { SelectChangeEvent } from '@mui/material';
import { getClubs } from '../api/datacontracts';

export default function SelectClubAuto(props: {
    selectedClub ?: {label: string, id: number};
    setSelectedClub : (label:string, id:number) => void
}) {
    const [Clubs, setClubs] = React.useState<getClubs[]>([])


  React.useEffect(() => {
    fetch(getClubsFn.path).then(res => res.json())
    .then(res =>{
        setClubs(res) 
        console.log(res)    
    })
  },[])

  const options = Clubs.map(club => (
    { label: club.nazwa, id: club.id_klub }
  ))


  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={(e,val) => {if(val) props.setSelectedClub(val.label,val.id); else props.setSelectedClub(" ",-1) }}
      value={props.selectedClub}
      options={options}
      sx={{ width: 300 , marginBottom: "10px" }}
      renderInput={(params) => <TextField {...params} label="Wybierz klub" />}
    />
  );
}
