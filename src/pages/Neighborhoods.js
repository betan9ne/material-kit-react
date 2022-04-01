import { useState} from 'react';

// material
import { Link as RouterLink } from 'react-router-dom';

import { Container, Accordion, AccordionSummary, Button, Typography, Grid,
   Dialog, } from '@mui/material';
// components
import Page from '../components/Page';

import useGetNeighbourhood from 'src/hooks/useGetNeighbourhood';

import firebase from './../firebase'
import Charts from './Charts/Charts';
import AddNeighborhoods from './DialogForms/AddNeighborhoods';
import AddPrecinct from './DialogForms/AddPrecinct';
import AddNewBlock from './DialogForms/AddNewBlock';
import Loader from 'src/components/Loader';

function Neighborhoods() {

  const [open, setOpen] = useState(false);
  const [openPrecinct, setPrecinctOpen] = useState(false);
  const [openBlock, setBlockOpen] = useState(false);



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

  
  const [selectedChart, setselectedChart] = useState(null)

  // when the neighborhood is clicked.
  const handleChangeControlled = (panel) => (event, isExpanded) => {
    setselectedChart(0)
 
    setblockId(null)
    setPrecinct(null)
    setprecinctList([])
    setNeighbourhood(panel)
    getPrecinctData(panel.id, 0)
    getListOfPrecints(panel.id)
    setControlled(isExpanded ? panel.id : false);
 
  };

  // wheen the precinct is clicked
  const handlePrecinctChangeControlled = (panel) => (event, isExpanded) => {
    setselectedChart(1)
 
       setPrecinct(panel)
    setblockId(null)
    setblockList([])
    getBlocks(panel.id)
    getPrecinctData(panel.id, 1)
   setprecinctControlled(isExpanded ? panel.id : false);
 
  };

  // when the block is clicked
  const handleBlockChangeControlled = (panel) => (event, isExpanded) => {
    setselectedChart(2)
    getPrecinctData(panel.id, 2)
    setblockId(null)
    setblockId(panel)
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

  const getPrecinctData = (id, typeOfChart) =>{
    let chart = null
    if(typeOfChart === 0 )
    {
      chart = "neighbourhood_id"
    }
    else if(typeOfChart === 1 )
    {
      chart = "precinct_id"
    }
    else if(typeOfChart === 2 )
    {
      chart = "block_id"
    }
    
    firebase.firestore().collection("sites").where(chart, "==", id).onSnapshot((doc)=>{
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
      
   <Typography variant="h4" sx={{ mb: 5 }}> Neighborhoods</Typography>
     {neighbourhood && neighbourhood ?
        <Typography variant="body1" sx={{ mb: 5 }}>
         {neighbourhood.neighbourhood} : {precinct && precinct.precint} : {blockId && blockId.block}</Typography> : <Typography variant="body1" sx={{ mb: 5 }}>Select a neighbourhood</Typography>}
      
      <Grid container  spacing={1}>
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
              {precinctList && precinctList.length === 0 ? <Typography variant='body1'>Collecting data</Typography> :  precinctList.map((precinct, index)=>(
              <Accordion
              key={precinct.id}
              expanded={precinctcontrolled === precinct.id}
              onChange={handlePrecinctChangeControlled(precinct)}
            >
             <AccordionSummary >
              <Typography variant="subtitle1"  noWrap={false} sx={{  flexShrink: 0,  color: 'text.disabled' }}>{precinct.precint}</Typography>
              </AccordionSummary>
           
                  {/* get list of blicks based on Precinct id */}
              {blockList && blockList.length === 0 ? <Typography variant='body1'>Collecting Data</Typography>  :  blockList.map((block, index)=>(
              <Accordion
              key={block.id}
              expanded={blockcontrolled === block.id}
              onChange={handleBlockChangeControlled(block)}
            >
              <AccordionSummary >
              <Typography variant="subtitle2" sx={{  flexShrink: 0,  color: 'warning.main' }}>{block.block}</Typography>
              </AccordionSummary>
           
            </Accordion>
            ))} 

            </Accordion>
            ))} 

            </Accordion>
          ))}
        </Grid>
   
    <Grid container xs={10} gap={3} md={10}>  
                <Grid container xs={12} gap={3} md={12}>
                <Button variant="outlined" color="warning" onClick={()=>setOpen(true)}>
    New Neighborhoods
      </Button>
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
              to={"/updateValues"} 
              state={{data:blockId}}
            >
              Update Values
            </Button>}

                </Grid>

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

     {neighbourhood ? <Charts data={precinctData} nb={neighbourhood} chartType={selectedChart} />
     :
     <Grid item xs={12} md={12}>
        <div style={{display:"flex", height:"80%", justifyContent:"center", alignItems:"center"}}>
          <Typography variant='h4'>Select a neighborhood to view data</Typography>
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