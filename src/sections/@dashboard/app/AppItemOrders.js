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
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
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
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------
 

export default function AppItemOrders() {
  const [docs, setdocs] = useState([])
  let neigh = useGetNeighbourhood().docs
  const models = [];

  useEffect(() => {
    //getFigures()
       
  }, [])

  const getFigures = () =>{
    neigh.forEach((a)=>{
    
      firebase.firestore().collection("blocks").where("neighbourhood_id","==", a.id).onSnapshot((doc)=>{
        doc.docs.forEach(document => {
          const nb = {
            id: document.id,
          }
          models.push(nb)
        })
        console.log(models)
        setdocs(models)
     })
    })
  }
  return (
    <RootStyle> 
      <Typography variant="h3">{fShortenNumber(docs.length)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Blocks
      </Typography>
    </RootStyle>
  );
}
