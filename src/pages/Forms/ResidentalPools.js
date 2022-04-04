import { useFormik } from 'formik';
import { useState, useEffect} from 'react';
// material
import { Container, Stack, Typography, Grid, TextField } from '@mui/material';
// components
import useGetModels from 'src/hooks/useGetModels';
import { LoadingButton } from '@mui/lab';
import { Form, FormikProvider } from 'formik';
import firebase from './../../firebase'

const ResidentalPools = ({data}) => {
  const [values, setValues] = useState({
    watts:data.watts,
    hours: data.hours
  });

  const updateData = () =>{   
    firebase.firestore().collection("models").doc(data.id).update(
       {
         watts: parseFloat(values.watts),         
         hours: parseFloat(values.hours)
       }
    ).then((doc)=>{
      alert("updated")
      setValues({})
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
    <Typography>{data.watts}</Typography>
    <TextField
      fullWidth
      label="Watts"

      onChange={handleChange('watts')}   
    />
    </div>

    <div>
    <Typography>{data.hours}</Typography>
    <TextField
      fullWidth
      label="Hours"
 
      onChange={handleChange('hours')}   
    />
   </div>
  </Stack>
  <LoadingButton type="submit" variant="contained" onClick={()=>updateData()} >
                    Save Changes
                  </LoadingButton>
  </Stack>
  </>
  )
}

export default ResidentalPools