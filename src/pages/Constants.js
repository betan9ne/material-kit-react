import { useFormik } from 'formik';
import { useState, useEffect} from 'react';
// material
import { Container, Stack, Typography, Button, Grid, TextField } from '@mui/material';
// components
import Page from '../components/Page';
import useGetModels from 'src/hooks/useGetModels';
import { LoadingButton } from '@mui/lab';
import { Form, FormikProvider } from 'formik';
import firebase from './../firebase'
function Constants() {

    const [selectedModel, setselectedModel] = useState(null)
    const [values, setValues] = useState({
        ...selectedModel,
        value :selectedModel && selectedModel.value
      });
    const [docs, setdocs] = useState([])

    useEffect(() => {
         firebase.firestore().collection("constants").onSnapshot((doc)=>{
            const models = [];
            doc.docs.forEach(document => {
              const nb = {
                id: document.id,
                ...document.data()
              }
              models.push(nb)
            })
            setdocs(models)
         })
    }, [])
    const pickAModel = (item) =>{
        setselectedModel(null)
        setselectedModel(item)       
      }

      const updateData = () =>{
   
        firebase.firestore().collection("constants").doc(selectedModel.id).update(
           {
               value: values.value
           }
        ).then((doc)=>{
          setselectedModel(null)
        }).catch((e)=>{
          alert(e)
        })
      }

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

  return (
    <Page title="Dashboard">
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Constants
      </Typography>

      <Grid container spacing={3}>
      <Grid item xs={6} md={6}>      
          <>  {docs.map((t, index)=>{
                    return(
                      <Button variant="contained" color={t === selectedModel ? "primary" : "inherit"} style={{marginRight:20}}  onClick={()=>pickAModel(t)}  key={index} sx={{ mb: 5 }}>
                      {t.type}
                      </Button>
                    )
                  })}
                </>     
      </Grid>
     {selectedModel &&  <Grid item xs={6} md={6}>Update Values
      <br/><br/>
      <Typography variant="h5" sx={{ mb: 5 }}>
            {selectedModel && selectedModel.type}
               </Typography>
      <Stack spacing={3}>
    <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }} >
    <TextField
      fullWidth
      label={selectedModel && selectedModel.value}
      onChange={handleChange('value')}      
      defaultValue={selectedModel.value}
    /> 
    
  </Stack>
  
     <LoadingButton disabled type="submit" onClick={()=>updateData()}  variant="contained" >
                    Save Changes
                  </LoadingButton> 
                  </Stack>
       </Grid>}

      </Grid>

       
    </Container>
  </Page>
  )
}

export default Constants