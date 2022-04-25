import { useFormik } from 'formik';
import { useState, useEffect} from 'react';
// material
import { Container, Stack, Typography, Grid, TextField, Button } from '@mui/material';
// components
import Page from '../components/Page';
import useGetModels from 'src/hooks/useGetModels';
import { LoadingButton } from '@mui/lab';
import { Form, FormikProvider } from 'formik';
import Infrastructure from './Forms/Infrastructure';
import Buildings from './Forms/Building';
import Transport from './Forms/Transport';
import ResidentalPools from './Forms/ResidentalPools';
// ----------------------------------------------------------------------
import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={30} height={30} />;
export default function Models() {

  const [docs, setdocs] = useState([])
  const [selectedModel, setselectedModel] = useState(null)
  let models_ = useGetModels().docs

  useEffect(() => {
    let result
    let abc =  models_.reduce((r, e) =>{
      let l = e.tag
     if(!r[l])
     {
       r[l] = {l, tag:[e]}
     }
     else
     {
       r[l].tag.push(e)
     } 
     return r
   }, {})
   result = Object.values(abc)
    setdocs(result)
  }, [models_])
  
  const pickAModel = (item) =>{
    setselectedModel(null)
    setselectedModel(item)
   
  }

 const handleSubmit = ()=>{
   alert()
 }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Models
        </Typography>

        <Grid container spacing={3}>
        <Grid item xs={9} md={9}>
        {docs.map((tag)=>{
          return(
            <>
            <Grid  item xs={12} sm={12} md={12} sx={{display:"flex",  marginLeft:1}} >
            {tag.l === "Transport" && getIcon('ant-design:car-filled')}
      {tag.l === "Buildings" && getIcon('fa6-solid:building-columns')}
      {tag.l === "Infrastructure" && getIcon('bxs:traffic')}
      {tag.l === "Residential Pools" && getIcon('fa-solid:swimming-pool')}
            <Typography variant="h5" sx={{ mb: 5, marginLeft:2 }}>
            {tag.l}
                  </Typography>
</Grid>
                  <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
                  {tag.tag.map((t, index)=>{
                    return(
                      <Button onClick={()=>pickAModel(t)}  variant="contained" color={t === selectedModel ? "primary" : "inherit"} style={{marginRight:20}}  key={index} sx={{ mb: 5 }}>
                      {t.model}
                      </Button>
                    )
                  })}
                  </div>
                  </>
          )
         
        })}
        </Grid>
      
      {selectedModel &&   <Grid item xs={3} md={3}>Values
        <br/><br/>
        <Typography variant="h5" sx={{ mb: 6 }}>
            {selectedModel && selectedModel.model}
                  </Typography>
        {selectedModel && selectedModel.tag === "Infrastructure" && <Infrastructure data={selectedModel} />}
        {selectedModel && selectedModel.tag === "Buildings" && <Buildings data={selectedModel} />}
        {selectedModel && selectedModel.tag === "Transport" && <Transport data={selectedModel}/>}
        {selectedModel && selectedModel.tag === "Residential Pools" && <ResidentalPools data={selectedModel}/>}
         </Grid>
      }
        </Grid>
  
         
      </Container>
    </Page>
  );
}
