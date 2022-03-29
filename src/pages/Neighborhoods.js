import { useFormik } from 'formik';
import { useState, useEffect} from 'react';
import { Icon } from '@iconify/react';
// material
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container, Accordion, AccordionSummary, Button, Typography, Grid,
   Dialog, TextField, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
// components
import Page from '../components/Page';
import useGetModels from 'src/hooks/useGetModels';
import useGetNeighbourhood from 'src/hooks/useGetNeighbourhood';
import OutputSummary from './Charts/OutputSummary';
import firebase from './../firebase'
import { Block } from '../components/Block';
import Charts from './Charts/Charts';
import AddNeighborhoods from './DialogForms/AddNeighborhoods';
import AddPrecinct from './DialogForms/AddPrecinct';
import AddNewBlock from './DialogForms/AddNewBlock';

function Neighborhoods() {

  const [open, setOpen] = useState(false);
  const [openPrecinct, setPrecinctOpen] = useState(false);
  const [openBlock, setBlockOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let docs = useGetNeighbourhood().docs
const [precinctData, setprecinctData] = useState([])
const [precinctList, setprecinctList] = useState([])
const [blockList, setblockList] = useState([])

  const [controlled, setControlled] = useState(false);
  const [precinctcontrolled, setprecinctControlled] = useState(false);
  const [blockcontrolled, setBlockControlled] = useState(false);

  const [blockId, setblockId] = useState(null)
  const [neighbourhood, setNeighbourhood] = useState(null)
  const [precinct, setPrecinct] = useState(null)

  const handleChangeControlled = (panel) => (event, isExpanded) => {
    setblockId(null)
    setPrecinct(null)
    setNeighbourhood(panel)
      getPrecinctData(panel.id)
      getListOfPrecints(panel.id)
    setControlled(isExpanded ? panel.id : false);
  };

  const handlePrecinctChangeControlled = (panel) => (event, isExpanded) => {
    //  getPrecinctData(panel.id)
    setPrecinct(panel)
    setblockId(null)
       getBlocks(panel.id)
   setprecinctControlled(isExpanded ? panel.id : false);
  };

  const handleBlockChangeControlled = (panel) => (event, isExpanded) => {
    setblockId(null)
    setblockId(panel)
    //   getBlocks(panel.id)
       setBlockControlled(isExpanded ? panel.id : false);
  };


const getListOfPrecints = (id) =>{
  firebase.firestore().collection("precinct").where("neighbourhood_id","==", id).onSnapshot((doc)=>{
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

  const getPrecinctData = (id) =>{
    firebase.firestore().collection("sites").where("neighbourhood_id","==", id).onSnapshot((doc)=>{
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

const getBlocks = (id) =>{
  firebase.firestore().collection("blocks").where("precinct_id","==", id).onSnapshot((doc)=>{
    const neighbourhood = [];
    doc.docs.forEach(document => {
      const nb = {
        id: document.id,
        ...document.data()
      }
      neighbourhood.push(nb)
    })
    console.log(neighbourhood)
    setblockList(neighbourhood)
 })
}

  return (
    <Page title="Dashboard">
   <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
      Neighborhoods
      </Typography>
      <Grid container spacing={1}>
      <Grid item xs={2} md={2}>
 
      {/* get list of neightbourhoods */}
           {docs.map((item, index) => (
            <Accordion
              key={item.id}
              expanded={controlled === item.id}
              onChange={handleChangeControlled(item)}
            >
              <AccordionSummary >
                <Typography variant="h6" noWrap={false} sx={{  }}>
                  {item.neighbourhood}
                </Typography> 
              </AccordionSummary>

          {/* get list of precinct based on neighbourhood id */}
              {precinctList && precinctList.map((precinct, index)=>(
              <Accordion
              key={precinct.id}
              expanded={precinctcontrolled === precinct.id}
              onChange={handlePrecinctChangeControlled(precinct)}
            >
              <AccordionSummary >
              <Typography variant="subtitle1" noWrap={false} sx={{  flexShrink: 0 }}>{precinct.precint}</Typography>
              </AccordionSummary>
           
                  {/* get list of blicks based on Precinct id */}
              {blockList && blockList.map((block, index)=>(
              <Accordion
              key={block.id}
              expanded={blockcontrolled === block.id}
              onChange={handleBlockChangeControlled(block)}
            >
              <AccordionSummary >
              <Typography variant="subtitle2" sx={{  flexShrink: 0 }}>{block.block}</Typography>
              </AccordionSummary>
           
            </Accordion>
            ))} 

            </Accordion>
            ))} 

            </Accordion>
          ))}
        </Grid>
   
    <Grid container xs={10} gap={3} md={10}>  
    <Button variant="outlined" color="warning" onClick={()=>setOpen(true)}>
    New Neighborhoods
      </Button>

                {/* add a new neighborhood */}
      <Dialog open={open} onClose={()=>setOpen(false)}>
      <AddNeighborhoods data={handleClose}/>
      </Dialog>
        
                {/* add a new precinct */}
      <Dialog open={openPrecinct} onClose={()=>setPrecinctOpen(false)}>
      <AddPrecinct data={()=>setPrecinctOpen(false)} item={neighbourhood}/>
      </Dialog>
          
                {/* add a new block */}
      <Dialog open={openBlock} onClose={()=>setBlockOpen(false)}>
      <AddNewBlock data={()=>setBlockOpen(false)} item={precinct}/>
      </Dialog>


      {neighbourhood && <Button
              variant="contained"
               onClick={()=>setPrecinctOpen(true)}
            >
              Add Precinct
            </Button>}

      {precinct && <Button
              variant="contained"
               onClick={()=>setBlockOpen(true)}
            >
              Add Block
            </Button>}

    {blockId && <Button
              variant="contained"
              component={RouterLink}
              to={"/dashboard/updateValues"} 
              state={{data:blockId}}
            >
              Update Values
            </Button>}

            
            <br/><br/>    
      <Charts data={precinctData} nb={neighbourhood} />
       </Grid>
      </Grid>

       
    </Container>
  </Page>
  )
}

export default Neighborhoods