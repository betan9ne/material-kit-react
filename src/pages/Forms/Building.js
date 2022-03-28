import { useFormik } from 'formik';
import { useState, useEffect} from 'react';
// material
import { Container, Stack, Typography, Grid, TextField } from '@mui/material';
// components
import useGetModels from 'src/hooks/useGetModels';
import { LoadingButton } from '@mui/lab';
import { Form, FormikProvider } from 'formik';

const Buildings = ({data}) => {
  return (
      <>
       <Stack spacing={3}>
    <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
    <TextField
      fullWidth
      label="Appliances"
      value={data.appliances}
    />
    <TextField
      fullWidth
      label="Cooking"
      value={data.cooking}
    />
  </Stack>
  <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
    <TextField
      fullWidth
      label="Lighting"
      value={data.lighting}
    />
    <TextField
      fullWidth
      label="Lighting External"
      value={data.lighting_external}
    />
  </Stack>
  <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
    <TextField
      fullWidth
      label="Space Heating"
      value={data.space_heating}
    />
    <TextField
      fullWidth
      label="Cooling"
      value={data.cooling}
    />
  </Stack>
  <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
    <TextField
      fullWidth
      label="Water Heating"
      value={data.water_heating}
    />
    <TextField
      fullWidth
      label="Pool Pump"
      value={data.pool_pump}
    />
  </Stack>
  <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
    <TextField
      fullWidth
      label="Gas - Water Heating"
      value={data.gas_water_heating}
    />
    <TextField
      fullWidth
      label="Gas - Cooking"
      value={data.gas_cooking}
    />
  </Stack>
  <LoadingButton type="submit" variant="contained" >
                    Save Changes
                  </LoadingButton></Stack>
  </>
  )
}

export default Buildings