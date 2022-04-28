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
const getIcon = (name) => <Iconify icon={name} width={50} height={50} />;
function People({data}) {
let theme = useTheme()

  const [fullData, setfullData] = useState([])
  const [total, settotal] = useState(0)

  useEffect(() => {
    getDataandLabels(data)
  }, [data])
  
  
  const getDataandLabels = (_data) =>{
     
    let label = []
    let data = []
    let total =0
    _data.forEach(e=>{
        label.push(e[0])           
        let asd = e[1].reduce( function(a, b){
        return a + parseFloat(b['modeInput']);
          }, 0);
       data.push(asd) 
    })     

    data.forEach((a)=>{
      if(isNaN(a))
      {

      }
      else
      {        
        total = total +  a
      }
    })
    settotal(total)
console.log(data)
    setfullData(_data)
   
}

let icons =['fluent:building-20-regular', 'fluent:building-bank-20-regular', 'bx:building-house']

  return (
 
     <Grid container xs={12} md={12} spacing={1}>
     
    {fullData.map((a, index)=>(
      a[1][0].modeInput &&  <Grid item xs={12} md={6}>
      <Card key={index} sx={{ display: 'flex', flexDirection:"column",  justifyContent:"center", alignItems:"center", height:"100%", paddingTop:3, paddingBottom:3, paddingRight:3, paddingLeft:5}}>
     {getIcon(icons[index-1])} 
         <Typography variant="body2" noWrap>
        {a[0]} 
 
      </Typography>
      <div>
      <Typography variant="h2" noWrap sx={{textAlign:"right"}}>
     {a[1][0].modeInput && fNumber(a[1][0].modeInput)} 
      </Typography>  
</div>
</Card>
</Grid>
    ))}
    <Grid item xs={12} md={6} sx={{  }}>
    <Card  sx={{ display: 'flex', flexDirection:"column",   backgroundColor: theme.palette.primary.lighter,  justifyContent:"center", alignItems:"center", height:"100%", paddingTop:3, paddingBottom:3, paddingRight:3, paddingLeft:5}}>
     <RootStyle>
     {getIcon('bi:people-fill')} 
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Number of People
      </Typography>
      <Typography variant="h2">{fNumber(total)}</Typography>
    </RootStyle>
    </Card>
     </Grid>
     </Grid>
 
  )
}

export default People