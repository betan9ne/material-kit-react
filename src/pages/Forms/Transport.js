import { useFormik } from 'formik';
import { useState, useEffect} from 'react';
// material
import { Container, Stack, Typography, Grid, TextField, Alert, Input } from '@mui/material';
// components
import useGetModels from 'src/hooks/useGetModels';
import { LoadingButton } from '@mui/lab';
import { Form, FormikProvider } from 'formik';
import firebase from './../../firebase'

const  Transport = ({data}) => {
  const [group, setgroup] = useState(data._group)
  const [values, setValues] = useState({
    ...data,
    emissions:data.emissions,
    _group:data._group
  });
  const updateData = () =>{
   
    firebase.firestore().collection("models").doc(data.id).update(
       values
    ).then((doc)=>{
      alert("updated")
    }).catch((e)=>{
      alert(e)
    })
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <>
    <Stack spacing={3}>
    <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
    <TextField
      fullWidth
      label="Emissions"
      onChange={handleChange('emissions')}      
      defaultValue={data.emissions}
    />

    <TextField
      fullWidth
      label="Fuel Type"
      value={group}
      onChange={handleChange('_group')}
    />
    
  </Stack>
  
     <LoadingButton type="submit" onClick={()=>updateData()} variant="contained" >
                    Save Changes
                  </LoadingButton> 
                  </Stack>
  </>
  )
}

export default Transport