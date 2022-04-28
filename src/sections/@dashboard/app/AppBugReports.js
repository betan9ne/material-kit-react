// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import Iconify from '../../../components/Iconify';
import firebase from './../../../firebase'
import React,{useState, useEffect} from 'react'
import useGetNeighbourhood from 'src/hooks/useGetNeighbourhood';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));

const TOTAL = 234;

export default function AppBugReports() {
  const [docs, setdocs] = useState(0)
  let neigh = useGetNeighbourhood().docs
  let blok = []
  useEffect(() => {
    getPrecincts() 
  }, [neigh])
 
  function getPrecincts(){
    setdocs(0)
    neigh.forEach((a)=>{
      blok.push(a.id)   
    })
    blok.forEach((a)=>{
      firebase.firestore().collection("sites").where("neighbourhood_id","==",a).get().then((doc)=>{ 
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
        Sites
      </Typography>
    </RootStyle>
  );
}
