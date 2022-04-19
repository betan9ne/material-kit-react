
import { useState, useEffect} from 'react';

// material
import {Link,  Link as RouterLink, useLocation } from 'react-router-dom';

import { Container, Card, Box, Button, Dialog, Typography, Grid, Breadcrumbs, } from '@mui/material';
// components
import Page from '../../components/Page';

import firebase from './../../firebase'
import useGetSites from './../../hooks/useGetSites'
import AddSite from './../DialogForms/AddSite';
import UpdateItem from './UpdateItem';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={30} height={30} />;
function UpdateSites() {
  const [open, setOpen] = useState(false);
  const [selectedSite, setselectedSite] = useState(null)
    let location = useLocation()
    let data = location.state.data.block
    let sites = useGetSites(location.state.data.id).docs
    const [docs, setdocs] = useState([])
  
    useEffect(() => {
      getModels()
      
  }, [])

    const getModels  = () =>{
      firebase.firestore().collection("models").onSnapshot((doc)=>{
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
   
   <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
            Update {data}
      </Typography>
      <Breadcrumbs>
      <Link  to="/Blocks"
            state={{data:location.state.data}}
             style={{ display: 'flex', color:"inherit", textDecoration:"none", justifyContent:"center", alignItems:"center" }}>
               {data}        </Link>
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

    <Grid container spacing={3} style={{marginTop:30}}>

    {docs && docs.map((s, index) => (
         
      <Grid container spacing={3} key={index} style={{}}>
      <Grid  item xs={12} sm={12} md={12} sx={{display:"flex", marginTop:5, marginLeft:5}} >
      <br/>
      {s.l === "Transport" && getIcon('ant-design:car-filled')}
      {s.l === "Buildings" && getIcon('fa6-solid:building-columns')}
      {s.l === "Infrastructure" && getIcon('bxs:traffic')}
      {s.l === "Residential Pools" && getIcon('fa-solid:swimming-pool')}
        <Typography variant="h6" sx={{marginLeft:2}} noWrap>
          {s.l}
        </Typography>
        </Grid>
      {s.tag.map((tag, index)=>(
            <UpdateItem data={tag} key={index} block={location.state.data} />
      ))}
  
        
    </Grid>
      
 
  
        ))}

       
    </Grid>
      </Container>
      </Page>
  )
}

export default UpdateSites
 