
import { useState, useEffect} from 'react';

// material
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { Container, Card, Box, Link, Button, Dialog, Typography, Grid, Breadcrumbs, } from '@mui/material';
// components
import Page from '../components/Page';

import firebase from './../firebase'
import useGetSites from './../hooks/useGetSites'
import AddSite from './DialogForms/AddSite';

function UpdateValues() {
  const [open, setOpen] = useState(false);
    let location = useLocation()
    let data = location.state.data.block
    let sites = useGetSites(location.state.data.id).docs
    const [docs, setdocs] = useState([])
    console.log(location.state.data)

    const handleClose = () => {
      setOpen(false);
    };

    
    useEffect(() => {
      getModels()
      
  }, [])

    const getModels  = (cat) =>{
      firebase.firestore().collection("models").get().then((doc)=>{
          const models = [];
          doc.docs.forEach(document => {
            const nb = {
              id: document.id,
              ...document.data()
            }
            models.push(nb)
          })

          let result
          let abc =  models.reduce((r, e) =>{
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
      })
  }
  return (
    <Page title="Dashboard">
         <Dialog open={open} onClose={()=>setOpen(false)}>
      <AddSite data={handleClose}/>
      </Dialog>
   <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
            Update {data}
      </Typography>
      <Breadcrumbs>
                <Link color="inherit" href="/neighborhoods" sx={{ display: 'flex', alignItems: 'center' }}>
                     Neighborhoods
                </Link>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary'
                  }}
                >
                 {data}     
                </Typography>
              </Breadcrumbs>
      <Grid container xs={12} md={12}>

          <Grid item xs={4} md={4}>
          <Grid container xs={12} spacing={1}>
          {docs && docs.map((s) => (
          <Grid key={s.id} item xs={12} md={12}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="h6" noWrap>
          {s.l}
        </Typography>
        
      </Box>
      </Card>
 
    {s.tag.map((tag, index)=>(
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          { tag.model}
        </Typography>
        
      </Box>
      <Button
        size="small"
        onClick={()=>setOpen(true)}
        variant={'outlined'}
        color={'primary'}
       
      >
      Add
      </Button>
      </Card>
         
      ))}  
          </Grid>
        ))}
        </Grid>
          </Grid>

          <Grid item xs={8} md={8}>
          <Typography variant="h5" noWrap>
        Current Site Values
        </Typography>
        <Typography variant="subtitle2" noWrap>
        Click on Edit to update specific site values
        </Typography>
          <Grid container xs={12} spacing={1}>
        
        {sites.map((s) => (
          <Grid key={s.id} item xs={12} md={4}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {s.model}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {s.scopeValue}
          </Typography>
        </Box>
      </Box>
    
      <Button
        size="small"
        onClick={()=>alert(s.model)}
        variant={'outlined'}
        color={'primary'}
       
      >
      Edit
      </Button>
    </Card>
          </Grid>
        ))}
      </Grid>
 </Grid>
      </Grid>
      </Container>
      </Page>
  )
}

export default UpdateValues