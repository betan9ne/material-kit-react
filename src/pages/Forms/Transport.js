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

  useEffect(() => {
     
  }, [data])
  
  const [values, setValues] = useState({
    emissions:data.emissions
  });
  const updateData = () =>{
   
    firebase.firestore().collection("models").doc(data.id).update(
       {
         emissions: values.emissions,
         
       }
    ).then((doc)=>{
      alert("updated")
      setValues(null)
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
    <div>
    <Typography>{data.emissions}</Typography>
    <TextField
      fullWidth
      label="Emissions"
      onChange={handleChange('emissions')}      
     
    />
    </div>
    {/* <div>
    <Typography>{data._group}</Typography>
    <TextField
      fullWidth
      label="Fuel Type"
     
      onChange={handleChange('_group')}
    />
    </div> */}
    
    
  </Stack>
  
     <LoadingButton type="submit" onClick={()=>updateData()} variant="contained" >
                    Save Changes
                  </LoadingButton> 
                  </Stack>
  </>
  )
}

export default Transport