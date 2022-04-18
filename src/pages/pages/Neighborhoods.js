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
import AddPrecinct from '../DialogForms/AddPrecinct';

function Neighborhoods() {
  const location = useLocation()
  const {data} = location.state
  const [open, setOpen] = useState(false);
  const [precinctList, setprecinctList] = useState([])
  const [precinctData, setprecinctData] = useState([])
  const anchorRef = useRef(null);
  const [openPrecinct, setPrecinctOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getListOfPrecints() 
    getPrecinctData()
  }, [data])
  
  const getListOfPrecints = (id) =>{
    firebase.firestore().collection("precinct").where("neighbourhood_id","==", data.id).onSnapshot((doc)=>{
      const neighbourhood = [];
      doc.docs.forEach(document => {
        const nb = {
          id: document.id,
          ...document.data()
        }
        neighbourhood.push(nb)
      })
      setprecinctList(neighbourhood)
      console.log(neighbourhood)
   })
  }

  const getPrecinctData = () =>{
 
    
    firebase.firestore().collection("sites").where("neighbourhood_id", "==", data.id).onSnapshot((doc)=>{
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
      <Dialog open={openPrecinct} onClose={()=>setPrecinctOpen(false)}>
      <AddPrecinct data={()=>setPrecinctOpen(false)} item={data}/>
      </Dialog>
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
      Neighborhood
        </Typography>
        <Typography gutterBottom variant="h4">
      {data.neighbourhood}
        </Typography>
        <Breadcrumbs>
        <Link  to="/Projects"
            style={{ display: 'flex', color:"inherit", alignItems: 'center' }}>
                     Projects
                </Link>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary'
                  }}
                >
              {data.neighbourhood}
                </Typography>
              </Breadcrumbs>
        </CardContent>
        </Grid>

        <Grid item xs={12} sm={2} md={2} style={{textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center"}}  >
        <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
       
        {precinctList.map((p, index)=>(
          <Box sx={{ p: 2, pt: 1.5 }} key={index}>
          <Link  to="/Precincts"
            state={{data:p}}
             style={{ display: 'flex', color:"inherit", textDecoration:"none", justifyContent:"center", alignItems:"center" }}>
          <Typography  color="inherit" sx={{textAlign:"center"}}  variant="body1">
            {p.precint}
          </Typography>
          </Link>
        </Box>
        ))

        }
       
      </MenuPopover>
          <Button variant="contained"   onClick={handleOpen}  ref={anchorRef} sx={{width:"100%"}}  color="warning"  >{precinctList.length} Precincts</Button>
          </Grid>

          <Grid item xs={12} sm={2} md={2} style={{textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center"}}  >
          <Button
          fullWidth
              variant="contained"
               onClick={()=>setPrecinctOpen(true)}
               style={{marginRight:20}}
            >
              Add Precinct
            </Button>
          </Grid>

          {/* <Grid item xs={12} sm={2} md={2} style={{textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center"}}  >
          <Button variant="contained" sx={{width:"100%"}}  color="error"  >Delete Neighborhood</Button>
          </Grid> */}
          
          <Grid item xs={12} sm={12} md={12}   >
        {precinctData.length > 0 ?  <Charts data={precinctData} nb={data} selected={data} chartType={0} /> : 
        <Grid item xs={12} md={12}>
        <div style={{display:"flex", height:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <Typography variant='h4' align='center'>There is no data here.<br/> You can add data at block level.</Typography>
          
        </div>
     </Grid>
        }
          </Grid>
    </Grid>
    </Container>
    </Page>
  )
}

export default Neighborhoods