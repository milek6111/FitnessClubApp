import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getUsersFn } from '../api/endpoints';
import { SelectChangeEvent } from '@mui/material';

export default function SelectPeriodAuto(props: {
    selectedPeriod ?: {label: string, days: number};
    setSelectedPeriod : (label:string, days:number) => void
}) {

  const options = [
    {
        label: "miesęczny",
        days: 30
    },
    {
        label: "kwartalny",
        days: 120
    },
    {
        label: "roczny",
        days: 360
    }
  ]


  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={(e,val) => {val && props.setSelectedPeriod(val.label,val.days)}}
      value={props.selectedPeriod}
      options={options}
      sx={{ width: 300, marginBottom: "10px"}}
      renderInput={(params) => <TextField {...params} label="Wybierz okres trwania karnetu" />}
    />
  );
}
