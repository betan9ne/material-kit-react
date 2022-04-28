// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import React,{useState, useEffect} from 'react'
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../../components/Iconify';
import firebase from './../../../firebase'
import useGetNeighbourhood from 'src/hooks/useGetNeighbourhood';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));


export default function AppNewUsers() {

  const [docs, setdocs] = useState(0)

  let neigh = useGetNeighbourhood().docs
 
const neighbourhoods = []
 
  useEffect(() => {

    getPrecincts()
 
  }, [neigh])
 
  function getPrecincts(){
    setdocs(0)
    neigh.forEach((a)=>{
      neighbourhoods.push(a.id)   
    })
    neighbourhoods.forEach((a)=>{
      firebase.firestore().collection("precinct").where("neighbourhood_id","==",a).get().then((doc)=>{ 
        doc.docs.forEach(document => {   
          setdocs(prevState => (prevState +1))
           })    
     })
    })
  }

  return (
    <RootStyle> 
      <Typography variant="h1">{fShortenNumber(docs)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>      
        Precincts
      </Typography>
    </RootStyle>
  );
}
