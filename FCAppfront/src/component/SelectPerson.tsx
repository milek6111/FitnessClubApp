import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getUsersFn } from '../api/endpoints';
import { useScrollTrigger } from '@mui/material';

export default function SelectPerson() {
  const [People, setPeople] = React.useState<{id_klient: number, imie:string, nazwisko: string}[]>([])
    const [selected, setSelected] = React.useState<number>()

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(Number(event.target.value))
  };

  React.useEffect(() => {
    fetch(getUsersFn.path).then(res => res.json())
    .then(res =>{
        setPeople(res) 
        console.log(res)    
    })
  },[])

  const content = People.map(person => (
    <MenuItem value={person.id_klient}> {person.imie} {person.nazwisko} </MenuItem>
  ))

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Osoby</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value= {String(selected)}
          label="dane"
          onChange={handleChange}
        >
          {content}
        </Select>
      </FormControl>
    </Box>
  );
}