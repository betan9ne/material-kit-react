import { useState} from 'react';

// material
import { Link as RouterLink } from 'react-router-dom';

import { Container, Accordion, AccordionSummary, Card, Breadcrumbs, Button, Typography, Grid,
   Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
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
  const [openDelete, setOpenDelete] = useState(false);
  const [openPrecinct, setPrecinctOpen] = useState(false);
  const [openBlock, setBlockOpen] = useState(false);

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let docs = useGetNeighbourhood().docs
  // lists
const [precinctData, setprecinctData] = useState([])
const [precinctList, setprecinctList] = useState([])
const [blockList, setblockList] = useState([])

// accordian status
  const [controlled, setControlled] = useState(false);
  const [precinctcontrolled, setprecinctControlled] = useState(false);
  const [blockcontrolled, setBlockControlled] = useState(false);

  //data collected
  const [blockId, setblockId] = useState(null)
  const [neighbourhood, setNeighbourhood] = useState(null)
  const [precinct, setPrecinct] = useState(null)

  //utils
    const [selectedChart, setselectedChart] = useState(null)
    const [selected, setselected] = useState(null)
    const [status, setstatus] = useState(false)

  // when the neighborhood is clicked.
  const handleChangeControlled = (panel) => (event, isExpanded) => {
    setstatus(true)
    setselectedChart(0)
    setselected(panel)
    setblockId(null)
    setPrecinct(null)
    setprecinctList([])
    setNeighbourhood(panel)
    getPrecinctData(panel.id, 0)
    getListOfPrecints(panel.id)
    setControlled(isExpanded ? panel.id : false);
 setstatus(false)
  };

  // wheen the precinct is clicked
  const handlePrecinctChangeControlled = (panel) => (event, isExpanded) => {
    setselectedChart(1)
    setselected(panel)
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
    setselected(panel)
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

const deleteRecord = (id) =>{
  let collection = null
  if(selectedChart === 0 )
  {
    collection = "neighbourhood"
  }
  else if(selectedChart === 1 )
  {
    collection = "precinct"
  }
  else if(selectedChart === 2 )
  {
    collection = "blocks"
  }

  firebase.firestore().collection(collection).doc(id).delete().then(()=>{
    alert("Record was deleted successfully")
    setOpenDelete(false)
    window.location.reload()
  }).catch((e)=>{
    alert(e)
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

{/* are you sure you weant to dleete this item */}
<Dialog open={openDelete} onClose={handleDeleteClose}>
        <DialogTitle>Delete Record</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this record from the database.
         
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={()=>deleteRecord(selected.id)} autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
{/* end of dialog box */}
   <Container maxWidth="xl">
      
   <Typography variant="h4" sx={{ mb: 5 }}>Neighborhoods</Typography>

      <Grid container  spacing={1}>
      <Grid item xs={2} md={2}>
      <Button variant="outlined" color="warning" onClick={()=>setOpen(true)}>
    New Neighborhoods
      </Button><br/><br/>
    
      {/* get list of neightbourhoods */}
           {docs.map((item, index) => (
            <Accordion
              key={item.id}
              expanded={controlled === item.id}
              onChange={handleChangeControlled(item)}
            >
              <AccordionSummary >
              <Button variant="contained" style={{width:"100%"}} color={item && neighbourhood && item.id === neighbourhood.id ? "primary" : "inherit"} >
              {item.neighbourhood}
              </Button>
           
              </AccordionSummary>

          {/* get list of precinct based on neighbourhood id */}
              {precinctList &&  precinctList.length === 0 ? <Typography variant='body1'>Collecting data</Typography> :  precinctList.map((precinct_, index)=>(
              <Accordion
              key={precinct_.id}
              expanded={precinctcontrolled === precinct_.id}
              onChange={handlePrecinctChangeControlled(precinct_)}
            >
             <AccordionSummary >
             <Button variant="contained" style={{width:"100%", marginLeft:20}} color={precinct && precinct_.id === precinct.id ? "secondary" : "inherit"} >
              {precinct_.precint}
              </Button>
           
              
              </AccordionSummary>
           
                  {/* get list of blicks based on Precinct id */}
              {blockList && blockList.length === 0 ? <Typography variant='body1'>Collecting Data</Typography>  :  blockList.map((block_, index)=>(
              <Accordion
              key={block_.id}
              expanded={blockcontrolled === block_.id}
              onChange={handleBlockChangeControlled(block_)}
            >
              <AccordionSummary >
              <Button variant="contained" style={{width:"100%", marginLeft:40}} color={blockId && block_.id === blockId.id ? "warning" : "inherit"} >
              {block_.block}
              </Button>
              
              </AccordionSummary>
           
            </Accordion>
            ))} 

            </Accordion>
            ))} 

            </Accordion>
          ))}
        </Grid>
   
    <Grid container xs={10} gap={3} md={10}>  
                <Grid container xs={12} gap={3} md={12} style={{paddingLeft:20}}>
     
      {neighbourhood &&
      <>
      <Button
              variant="contained"
               onClick={()=>setPrecinctOpen(true)}
            >
              Add Precinct
            </Button>
    
            </> 
            }

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
            
            {
              neighbourhood &&
              <Button
              variant="contained"
               onClick={()=>setOpenDelete(true)}
               color="error"
            >
              Delete {selectedChart === 0 && neighbourhood.neighbourhood}
              {selectedChart === 1 && precinct.precint}
              {selectedChart === 2 && blockId.block}
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

     {neighbourhood ?
     <>
     <Grid style={{paddingLeft:20}}>
     <Breadcrumbs>
     <Typography variant="body2"   sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary'
                  }}>{neighbourhood && neighbourhood.neighbourhood}</Typography>
         <Typography variant="body2"  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary'
                  }}>{precinct && precinct.precint} </Typography>
         <Typography variant="body2"  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary'
                  }}>{blockId && blockId.block}</Typography> 
           
     </Breadcrumbs>
  
     <Typography variant='body2'>Showing {selectedChart ===0 && "Neighbourhood"}
      {selectedChart ===1 && "Precinct"}
      {selectedChart ===2 && "Block"} Charts</Typography>
     </Grid>
      <Charts data={precinctData} nb={neighbourhood} selected={selected} chartType={selectedChart} />
     </>
      
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