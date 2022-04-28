import React, {useEffect, useState} from 'react'
import { Card,Typography, Grid,  } from '@mui/material';
import Iconify from '../../components/Iconify';
import { useTheme, styled } from '@mui/material/styles';
import { merge } from 'lodash';
import { BaseOptionChart } from '../../components/charts';
import { fNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={40} height={40} />;
function Vehicles({data}) {

  
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
//small car, medium car, large, motocycle, van
let icons = ["fa-solid:car-side", "mdi:car-estate", "fluent:vehicle-truck-profile-24-filled", "fa-solid:motorcycle", "mdi:car-pickup", "fa6-solid:truck-moving"]

  return (
    <Grid item xs={12} md={12}>
    
 <Grid container xs={12} spacing={2} md={12}>

 
    {fullData && fullData.map((a, index)=>(
      <Grid container xs={12} md={4}>
      <Card key={index} sx={{ display: 'flex', flexDirection:"column", marginTop:1, marginBottom:1, width:"100%", justifyContent:"center", paddingTop:3, paddingBottom:3, paddingRight:3, paddingLeft:5}}>
         <Typography variant="body2" noWrap>
         {a[0].includes("Small") && getIcon(icons[0])}
         {a[0].includes("Medium") && getIcon(icons[1])}
         {a[0].includes("Large") && getIcon(icons[2])}
         {a[0].includes("Motorcycle") && getIcon(icons[3])}
         {a[0].includes("Van") && getIcon(icons[4])} 
         {a[0].includes("Heavy") && getIcon(icons[5])} 

          <br/>
        {a[0]} 

      </Typography>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      <Typography variant="h4" noWrap sx={{textAlign:"right"}}><span style={{fontSize:16}}>Km/year</span><br/>{a[1][0] === undefined ? null :  fNumber(a[1][0].modeInput)}
      </Typography>
      
      <Typography variant="h4" noWrap sx={{textAlign:"right"}}><span style={{fontSize:16}}>Cars</span><br/> {a[1][0].scopeValue && `${a[1][0].scopeValue}`}
      </Typography>
   
</div>
</Card>
</Grid>
    ))}
    </Grid>
      </Grid>
  )
}


export default Vehicles