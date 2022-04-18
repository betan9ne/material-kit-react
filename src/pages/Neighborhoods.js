import { useState} from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
// material
import { Link as RouterLink } from 'react-router-dom';

import { Container, Accordion, Collapse, AccordionSummary, Card, Breadcrumbs, Button, Typography, Grid,
   Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
// components
import Page from '../components/Page';
import { TreeView, TreeItem, treeItemClasses } from '@mui/lab'
import { alpha, styled } from '@mui/material/styles';
import useGetNeighbourhood from 'src/hooks/useGetNeighbourhood';

import firebase from './../firebase'
import Charts from './Charts/Charts';
import AddNeighborhoods from './DialogForms/AddNeighborhoods';
import AddPrecinct from './DialogForms/AddPrecinct';
import AddNewBlock from './DialogForms/AddNewBlock';
import Loader from 'src/components/Loader';
import SvgIcon from '@mui/material/SvgIcon'; 

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}


function TransitionComponent(props) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>    
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));


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
<Button variant="contained" color="primary" onClick={()=>setOpen(true)}>
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
        {precinctList &&  precinctList.length === 0 ? <Typography variant='body1'>No Data found</Typography> :  precinctList.map((precinct_, index)=>(
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
        {blockList && blockList.length === 0 ? <Typography variant='body1'>No Data found</Typography>  :  blockList.map((block_, index)=>(
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
                <Grid  xs={12} gap={3} style={{paddingLeft:20}}>
     
      {neighbourhood &&
      <>
      <Button
              variant="contained"
               onClick={()=>setPrecinctOpen(true)}
               style={{marginRight:20}}
            >
              Add Precinct
            </Button>
    
            </> 
            }

      {precinct && <Button
              variant="contained"
               onClick={()=>setBlockOpen(true)}
               style={{marginRight:20}}
            >
              Add Block
            </Button>}

    {blockId && <Button
              variant="contained"
              component={RouterLink}
              style={{marginRight:20}}
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
     {precinctData.length === 0 ? 
      <Container maxWidth="xl">
        <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <div style={{display:"flex", height:"100%", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <Typography variant='h4' align='center'>There is no data here.<br/> You can add data at block level.</Typography>
          <br/><br/>
          {blockId && <Button
              variant="contained"
              component={RouterLink}
              style={{marginRight:20}}
              to={"/updateValues"} 
              state={{data:blockId}}
            >
              Update Values
            </Button>}
        </div>
     </Grid>
     </Grid>
     </Container>
       :
      <Charts data={precinctData} nb={neighbourhood} selected={selected} chartType={selectedChart} />}
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