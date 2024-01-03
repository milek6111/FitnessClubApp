import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllClasses, getAllClassesInfo, getClubsFn, getUsersFn } from '../api/endpoints';
import { SelectChangeEvent } from '@mui/material';
import { getClubs } from '../api/datacontracts';

export default function SelectClassAuto(props: {
    selectedClub ?: {label: string, id: number};
    selectedClass ?: {label: string, id: number};
    setSelectedClass : (label:string, id:number) => void
}) {
    const [classes, setClasses] = React.useState<{id_zajecia: number, id_klub: number, id_trener: number, nazwa: string}[]>([])


  React.useEffect(() => {
    fetch(getAllClassesInfo.path).then(res => res.json())
    .then(res =>{
        setClasses(res) 
        console.log(res)    
    })
  },[])

  const options = classes.filter(clas => (
    clas.id_klub === props.selectedClub?.id
  ))
  .map(clas => (
    { label: clas.nazwa, id: clas.id_zajecia, id_klub: clas.id_klub }
  ))


  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={(e,val) => {if(val) props.setSelectedClass(val.label,val.id); else props.setSelectedClass(" ",-1) }}
      value={props.selectedClass}
      options={options}
      sx={{ width: 300 , marginBottom: "10px" }}
      renderInput={(params) => <TextField {...params} label="Wybierz zajęcia" />}
    />
  );
}
