import React, {useEffect, useState} from 'react'
import { Card,Typography, Grid,  } from '@mui/material';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={30} height={30} />;
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
        return a + parseFloat(b['total']);
          }, 0);
       data.push(asd) 
    })     
    let sdf  = {
        labels : label,
        data : data
    }
    setfullData(_data)
   
}

  return (
    <Grid item xs={12} md={12}>
      <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
    {getIcon('bi:stoplights-fill')} 
     <Typography  textAlign={"center"}>Infrastructure</Typography>
     </div>
    {fullData.map((a, index)=>(
      <Card key={index} sx={{ display: 'flex',  marginTop:1, marginBottom:1, justifyContent:"space-between",paddingTop:3, paddingBottom:3, paddingRight:3, paddingLeft:5}}>
         <Typography variant="body2" noWrap>
        {a[0]} 

      </Typography>
      <div>
      <Typography variant="body2" noWrap sx={{textAlign:"right"}}>
      {a[1][0].modeInput && (a[1][0].modeInput).toFixed(2)} 
      </Typography>
      
      <Typography variant="body2" noWrap sx={{textAlign:"right"}}>
       Number of Lights : {a[1][0].scopeValue && `${a[1][0].scopeValue}`}
      </Typography>
      {/* <Typography variant="body2" noWrap> 
        {a[1][0].total && (a[1][0].total).toFixed(2)}
      </Typography> */}
</div>
</Card>
    ))}
      </Grid>
  )
}
export default Infrastructure