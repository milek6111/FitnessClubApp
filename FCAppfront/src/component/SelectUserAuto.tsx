import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getUsersFn } from '../api/endpoints';
import { SelectChangeEvent } from '@mui/material';

export default function SelectUserAuto(props: {
    selectedClient ?: {label: string, id: number};
    setSelectedClient : (label:string, id:number) => void
}) {
    const [People, setPeople] = React.useState<{id_klient: number, imie:string, nazwisko: string}[]>([])


  React.useEffect(() => {
    fetch(getUsersFn.path).then(res => res.json())
    .then(res =>{
        setPeople(res) 
        console.log(res)    
    })
  },[])

  const options = People.map(person => (
    { label: person.imie + " " + person.nazwisko, id: person.id_klient }
  ))


  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={(e,val) => {val && props.setSelectedClient(val.label,val.id)}}
      value={props.selectedClient}
      options={options}
      sx={{ width: 300 , marginBottom: "10px" }}
      renderInput={(params) => <TextField {...params} label="Wybierz osobe" />}
    />
  );
}
