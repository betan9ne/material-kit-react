import { useFormik } from 'formik';
import { useState, useEffect} from 'react';
// material
import { Container, Stack, Typography, Grid, TextField } from '@mui/material';
// components
import useGetModels from 'src/hooks/useGetModels';
import { LoadingButton } from '@mui/lab';
import { Form, FormikProvider } from 'formik';

const Infrastructure = ({data}) => {

  return (
      <>
              <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
    <TextField
      fullWidth
      label="Watts"
      value={data.watts}
    />
    <TextField
      fullWidth
      label="Hours"
      value={data.hours}
    />
     
  </Stack>
  <LoadingButton type="submit" variant="contained" >
                    Save Changes
                  </LoadingButton>
            </Stack>
      </>
    
  )
}

export default Infrastructure