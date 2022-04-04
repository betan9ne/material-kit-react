import { useFormik } from 'formik';
import { useState, useEffect} from 'react';
// material
import { Container, Stack, Typography, Grid, TextField } from '@mui/material';
// components
import useGetModels from 'src/hooks/useGetModels';
import { LoadingButton } from '@mui/lab';
import { Form, FormikProvider } from 'formik';
import firebase from './../../firebase'

const Buildings = ({data}) => {

  const [values, setValues] = useState({
    appliances:data.appliances,
    cooling: data.cooling,
    lighting: data.lighting,
    lighting_external: data.lighting_external,
    space_heating: data.space_heating,
    cooking: data.cooking,
    water_heating: data.water_heating,
    pool_pump: data.pool_pump,
    gas_water_heating: data.gas_water_heating,
    gas_cooking: data.gas_cooking
  });

  const updateData = () =>{   
    firebase.firestore().collection("models").doc(data.id).update(
       {       
         
         appliances: parseFloat(values.appliances),
         cooling:  parseFloat(values.cooling),
         lighting:  parseFloat(values.lighting),
         lighting_external:  parseFloat(values.lighting_external),
         space_heating:  parseFloat(values.space_heating),
         cooking:  parseFloat(values.cooking),
         water_heating:  parseFloat(values.water_heating),
         pool_pump:  parseFloat(values.pool_pump),
         gas_water_heating:  parseFloat(values.gas_water_heating),
         gas_cooking:  parseFloat(values.gas_cooking)
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
       {data.id}
    <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
    <div>
    <Typography>{data.appliances}</Typography>
    <TextField
      fullWidth
      label="Appliances"
      onChange={handleChange('appliances')} 
    />
    </div>
    <div>
    <Typography>{data.cooling}</Typography>
    <TextField
      fullWidth
      label="Cooling"
      onChange={handleChange('cooling')} 
    />
    </div>

  </Stack>
  <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
  <div>
    <Typography>{data.lighting}</Typography>
    <TextField
      fullWidth
      label="Lighting"
      onChange={handleChange('lighting')} 
    /></div>
       <div>
    <Typography>{data.lighting_external}</Typography>
    <TextField
      fullWidth
      label="Lighting External"
      onChange={handleChange('lighting_external')} 
    />
    </div>
  </Stack>
  <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
  <div>
    <Typography>{data.space_heating}</Typography>
    <TextField
      fullWidth
      label="Space Heating"
      onChange={handleChange('space_heating')} 
    />
    </div>
    <div>
    <Typography>{data.cooking}</Typography>
    <TextField
      fullWidth
      label="Cooking"
      onChange={handleChange('cooking')} 
    />
    </div>
  </Stack>
  <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
  <div>
    <Typography>{data.water_heating}</Typography>
    <TextField
      fullWidth
      label="Water Heating"
      onChange={handleChange('water_heating')} 
    /></div>
     <div>
    <Typography>{data.pool_pump}</Typography>
    <TextField
      fullWidth
      label="Pool Pump"
      onChange={handleChange('pool_pump')} 
    />
    </div>
  </Stack>
  <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
  <div>
    <Typography>{data.gas_water_heating}</Typography>
    <TextField
      fullWidth
      label="Gas - Water Heating"
      onChange={handleChange('gas_water_heating')} 
    />
    </div>
    <div>
    <Typography>{data.gas_cooking}</Typography>
    <TextField
      fullWidth
      label="Gas - Cooking"
      onChange={handleChange('gas_cooking')} 
    />
    </div>
  </Stack>
  <LoadingButton type="submit" variant="contained" onClick={()=>updateData()} >
                    Save Changes
                  </LoadingButton></Stack>
  </>
  )
}

export default Buildings