import React, {useEffect, useState} from 'react'
import { Card,Typography, Grid,  } from '@mui/material';
import Iconify from '../../components/Iconify';
import { useTheme, styled } from '@mui/material/styles';
import { merge } from 'lodash';
import { BaseOptionChart } from '../../components/charts';
import { fNumber } from '../../utils/formatNumber';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  width:"100%",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const getIcon = (name) => <Iconify icon={name} width={40} height={40} />;
function Infrastructure({data}) {

  const [fullData, setfullData] = useState([])
 
  useEffect(() => {
    getDataandLabels(data)
  }, [data])
  
  
  const getDataandLabels = (_data) =>{
     
    let label = []
    let data = []
 
    
    _data.forEach(e=>{
        label.push(e[0])           
        let asd = e[1].reduce( function(a, b){
        return a + parseFloat(b['scopeValue']);
          }, 0);
       data.push(asd) 
    })     
 
    setfullData(_data)
   
}

let icons=[ 'bi:stoplights-fill' , 'ic:baseline-light']
  return (
    <Grid item xs={12} md={12} sx={{display:"flex", flexDirection:"column", justifyContent:"space-around",}}>
 
    {fullData.map((a, index)=>(
      <Card key={index} sx={{ display: 'flex',  marginTop:1, marginBottom:1, justifyContent:"space-between",paddingTop:10, paddingBottom:10, paddingRight:3, paddingLeft:5}}>
         <Typography variant="body2" noWrap textAlign={"center"}>
         {getIcon(icons[index])} <br/>
        {a[0]} 

      </Typography>
      <div>      
      <Typography variant="h2" noWrap sx={{textAlign:"right"}}>
     {a[1][0].scopeValue &&  fNumber(a[1][0].scopeValue)}
      </Typography>
 
</div>
</Card>
    ))}

      </Grid>
  )
}
export default Infrastructure