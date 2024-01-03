import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getTrainersFn, getUsersFn } from '../api/endpoints';
import { SelectChangeEvent } from '@mui/material';

export default function SelectTrainerAuto(props: {
    selectedTrainer ?: {label: string, id: number};
    selectedClub ?: {label:string, id: number};
    setSelectedTrainer : (label:string, id:number) => void
}) {
    const [People, setPeople] = React.useState<{id_trener: number, id_klub: number, imie:string, nazwisko: string}[]>([])


  React.useEffect(() => {
    fetch(getTrainersFn.path).then(res => res.json())
    .then(res =>{
        setPeople(res) 
        console.log(res)    
    })
  },[])

  const options = People.filter(person => (
    person.id_klub == props.selectedClub?.id
  )) 
    .map(person => (
    { label: person.imie + " " + person.nazwisko, id: person.id_trener }
  ))


  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={(e,val) => {val && props.setSelectedTrainer(val.label,val.id) }}
      value={props.selectedTrainer}
      options={options}
      sx={{ width: 300 , marginBottom: "10px" }}
      renderInput={(params) => <TextField {...params} label="Wybierz trenera" />}
    />
  );
}
