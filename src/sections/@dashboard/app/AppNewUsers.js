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

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

 

export default function AppNewUsers() {

  const [docs, setdocs] = useState([])

  let neigh = useGetNeighbourhood().docs
 
  useEffect(() => {
    const models = [];
    neigh.forEach((a)=>{
      firebase.firestore().collection("precinct").where("neighbourhood_id","==",a.id).get().then((doc)=>{ 
        doc.docs.forEach(document => {
         
          models.push(document.id)
           })
         
        setdocs(models)
        console.log(models)   
     })
     
    })
 
  }, [neigh])

  return (
    <RootStyle> 
      <Typography variant="h3">{fShortenNumber(docs.length)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>      
        Precincts
      </Typography>
    </RootStyle>
  );
}
