// material
import { Box, Grid, Container, Typography, Breadcrumbs, Button, Dialog } from '@mui/material';
import { Link, Link as RouterLink, useLocation } from 'react-router-dom';
// components
import Page from '../../components/Page';
import {useEffect,useRef, useState} from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';
import firebase from "../../firebase"
import MenuPopover from '../../components/MenuPopover';
import Charts from '../Charts/Charts';
function Blocks() {
  const location = useLocation()
  const {data} = location.state
console.log(location.state)
 
  const [precinctData, setprecinctData] = useState([])
 
  useEffect(() => {
    getPrecinctData()
  }, [data])
  const getPrecinctData = () =>{
 
    
    firebase.firestore().collection("sites").where("block_id", "==", data.id).onSnapshot((doc)=>{
      const data = [];
     
      doc.docs.forEach(document => {
        const nb = {
          id: document.id,
          ...document.data()
        }
        data.push(nb)
      })
      setprecinctData(data)
    
   })
  }
 
  return (
   <Page title="Dashboard">
    <Container maxWidth="xl">
    <Grid container spacing={3} style={{}}>
    <Grid item xs={12} sm={12} md={12}>
        <CardContent
        sx={{
          color: 'grey.800',
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="subtitle2">
      Block
        </Typography>
        <Typography gutterBottom variant="h4">   
        {data.block}
        </Typography>
        <Breadcrumbs>
        <Link  to="/Projects"
            style={{ display: 'flex', color:"inherit", alignItems: 'center' }}>
                     Projects
                </Link>
        <Link  to="/Neighborhoods"
         state={{data:data}}
            style={{ display: 'flex', color:"inherit", alignItems: 'center' }}>
                    Neighborhood
                </Link>
                <Link  to={"/Precincts/"+location.state.id}
         state={{data:location.state}}
            style={{ display: 'flex', color:"inherit", alignItems: 'center' }}>
                    {location.state.precint}
                </Link>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary'
                  }}
                >
              {data.block}
                </Typography>
              </Breadcrumbs>
        </CardContent>
        </Grid>

        <Grid item xs={12} sm={2} md={2} style={{textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center"}}  >
          <Button
              variant="contained"
              color='primary' fullWidth
              component={RouterLink}
              style={{marginRight:20}}
              to={"/updateValues"} 
              state={{data:data}}
            >Update Sites</Button>
          </Grid>

          {/* <Grid item xs={12} sm={2} md={2} style={{textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center"}}  >
          <Button variant="contained" sx={{width:"100%"}}  color="error"  >Delete Block</Button>
          </Grid> */}

          <Grid item xs={12} sm={12} md={12}   >
       {precinctData.length > 0 ? <Charts data={precinctData} nb={data} selected={data} chartType={2} /> : 
       <Grid item xs={12} md={12}>
        <div style={{display:"flex", height:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <Typography variant='h4' align='center'>There is no data here.<br/> 
          <Button
              variant="contained"
              color='primary' fullWidth
              component={RouterLink}
              style={{marginRight:20}}
              to={"/updateValues"} 
              state={{data:data}}
            >Update Sites</Button> to get started.
          </Typography>
          
        </div>
     </Grid>
       }
          </Grid>

    </Grid>
    </Container>
    </Page>
  )
}

export default Blocks