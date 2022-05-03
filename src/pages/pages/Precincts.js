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
import AddNewBlock from '../DialogForms/AddNewBlock';

function Precincts() {
  const location = useLocation()
 
  const {data} = location.state

  const [open, setOpen] = useState(false);
  const [precinctList, setprecinctList] = useState([])
  const [precinctData, setprecinctData] = useState([])
  const anchorRef = useRef(null);
  const [openBlock, setBlockOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
console.log(data)
  useEffect(() => {
    getListOfPrecints() 
    getPrecinctData()
  }, [data])
  
  const getListOfPrecints = (id) =>{
    firebase.firestore().collection("blocks").where("precinct_id","==", data.id).onSnapshot((doc)=>{
      const neighbourhood = [];
      doc.docs.forEach(document => {
        const nb = {
          id: document.id,
          ...document.data()
        }
        neighbourhood.push(nb)
      })
      setprecinctList(neighbourhood)
   
   })
  }

  
  const getPrecinctData = () =>{
 
    
    firebase.firestore().collection("sites").where("precinct_id", "==", data.id).onSnapshot((doc)=>{    
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
     <Dialog open={openBlock} onClose={()=>setBlockOpen(false)}>
      <AddNewBlock data={()=>setBlockOpen(false)} item={data}/>
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
      Precinct
        </Typography>
        <Typography gutterBottom variant="h4">   
      
      {data.precint}
        </Typography>
        <Breadcrumbs>
        <Link  to="/Projects"
            style={{ display: 'flex', color:"inherit", alignItems: 'center' }}>
                     Projects
                </Link>
        <Link  to={"/Neighbourhoods/"+data.neighbourhood_id}
         state={{data:location.state}}
            style={{ display: 'flex', color:"inherit", alignItems: 'center' }}>
                     {data.neighbourhood_name}
                </Link>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary'
                  }}
                >
              {data.precint}
                </Typography>
              </Breadcrumbs>
        </CardContent>
        </Grid>

        <div style={{marginLeft:60}}>
        <Button
               variant="contained"
               onClick={()=>setBlockOpen(true)}
               style={{marginRight:20}}
            >
              + {precinctList.length} Blocks
            </Button>
       
        {precinctList.map((p, index)=>(
          <Button variant="outlined" style={{marginRight:20}} key={index} onClick={handleOpen}  ref={anchorRef} color="primary"  >
              <Link  to={"/Blocks/"+p.id}
            state={{data:p, ...data}}
             style={{ display: 'flex', color:"inherit", textDecoration:"none", justifyContent:"center", alignItems:"center" }}>{p.block} </Link></Button>
 
        ))

        }
        </div>
{/*  
          <Button variant="contained"   onClick={handleOpen}  ref={anchorRef} sx={{width:"100%"}}  color="warning"  >{precinctList.length} Blocks</Button>
          */}

          <Grid item xs={12} sm={2} md={2} style={{textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center"}}  >
          {/* <Button variant="contained" sx={{width:"100%"}}  color="primary"  onClick={()=>setBlockOpen(true)} >Add Block</Button> */}
          </Grid>

          {/* <Grid item xs={12} sm={2} md={2} style={{textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center"}}  >
          <Button variant="contained" sx={{width:"100%"}}  color="error"  >Delete Precinct</Button>
          </Grid> */}
          <Grid item xs={12} sm={12} md={12}   >
          {precinctData.length > 0 ? <Charts data={precinctData} nb={data} selected={data} chartType={1} /> : 
       <Grid item xs={12} md={12}>
        <div style={{display:"flex", height:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>

          <Typography variant='h4' align='center'>There is no data here.<br/>
          <Button variant="contained" sx={{width:"100%"}}  color="primary"  onClick={()=>setBlockOpen(true)} >Add Block</Button>
           to get started.</Typography>
          
        </div>
     </Grid>
       }
          </Grid>
    </Grid>
    </Container>
    </Page>
  )
}

export default Precincts