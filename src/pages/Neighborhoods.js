import { useFormik } from 'formik';
import { useState, useEffect} from 'react';
import { Icon } from '@iconify/react';
// material
import { styled } from '@mui/material/styles';
import { Container, Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Paper,  ListItemText,  List, ListItem,ListItemAvatar, TextField } from '@mui/material';
// components
import Page from '../components/Page';
import useGetModels from 'src/hooks/useGetModels';
import useGetNeighbourhood from 'src/hooks/useGetNeighbourhood';
import OutputSummary from './Charts/OutputSummary';
import firebase from './../firebase'
import { Block } from '../components/Block';

function Neighborhoods() {

  let docs = useGetNeighbourhood().docs
const [precinctData, setprecinctData] = useState([])
const [precinctList, setprecinctList] = useState([])
const [blockList, setblockList] = useState([])
  const [selectedModel, setselectedModel] = useState(null)
  const [controlled, setControlled] = useState(false);
  const [precinctcontrolled, setprecinctControlled] = useState(false);
  const [blockcontrolled, setBlockControlled] = useState(false);

  const handleChangeControlled = (panel) => (event, isExpanded) => {
      getPrecinctData(panel.id)
      getListOfPrecints(panel.id)
    setControlled(isExpanded ? panel.id : false);
  };

  const handlePrecinctChangeControlled = (panel) => (event, isExpanded) => {
    //  getPrecinctData(panel.id)
    console.log(panel)
       getBlocks(panel.id)
   setprecinctControlled(isExpanded ? panel.id : false);
  };

  const handleBlockChangeControlled = (panel) => (event, isExpanded) => {
 
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
      <Grid item xs={3} md={3}>
      {/* get list of neightbourhoods */}
           {docs.map((item, index) => (
            <Accordion
              key={item.id}
              expanded={controlled === item.id}
              onChange={handleChangeControlled(item)}
            >
              <AccordionSummary >
                <Typography variant="h6" sx={{  flexShrink: 0 }}>
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
              <Typography variant="subtitle1" sx={{  flexShrink: 0 }}>{precinct.precint}</Typography>
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

    {selectedModel &&   
    <Grid item xs={5} md={5}>      

      {/* <Typography variant="subtitle1" sx={{ mb: 5 }}>
          {selectedModel && selectedModel.neighbourhood}
                 </Typography> 
              {precinctData &&  <OutputSummary data={precinctData}/>} */}
       </Grid>
    }
    <Grid item xs={5} md={5}>      
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Charts
                 </Typography> 
       </Grid>
      </Grid>

       
    </Container>
  </Page>
  )
}

export default Neighborhoods