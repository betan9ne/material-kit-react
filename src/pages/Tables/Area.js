import React, {useEffect, useState} from 'react'
import { Card,Typography, Grid,  } from '@mui/material';
import Iconify from '../../components/Iconify';
import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@mui/material/styles';
import { merge } from 'lodash';
import { BaseOptionChart } from '../../components/charts';
import { fNumber } from '../../utils/formatNumber';
// ----------------------------------------------------------------------

const CHART_HEIGHT = 472;
const LEGEND_HEIGHT = 180;
 
const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  width:"100%",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const ChartWrapperStyle = styled('div')(({ theme }) => ({
 
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

const getIcon = (name) => <Iconify icon={name} width={30} height={30} />;

function Area({data}) {
  const theme = useTheme();
  const [fullData, setfullData] = useState([])
  const [labels, setlabels] = useState([])
  const [_data, setdata_] = useState([])
const [total, settotal] = useState(0)

  useEffect(() => {
    getDataandLabels(data)
  }, [data])
  
  
  const getDataandLabels = (_data) =>{
     
    let label = []
    let data = []
    let total = 0
    
    _data.forEach(e=>{
        label.push(e[0])           
        let asd = e[1].reduce( function(a, b){
        return a + parseFloat(b['scopeValue']);
          }, 0);
       data.push(asd) 
    })     

    data.forEach((a)=>{
      total = total + a
    })
    settotal(total)
   
    setfullData(_data)
    setdata_(data)            
    setlabels(label)
   
}

const chartOptions2 = merge(BaseOptionChart(), {
  colors: [
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.warning.main,
    theme.palette.error.main
  ],
  animations: {
    enabled: false
  },
  labels: labels,
  stroke: { show: false },
  legend: { horizontalAlign: 'center' },
  plotOptions: { pie: { donut: { size: '75%' } } }
});

  return (
    <Grid container xs={12} md={12}>
    <Grid item  xs={12} md={4}>
    <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={_data} options={chartOptions2} height={320} />
      </ChartWrapperStyle>
    </Grid>
    <Grid item xs={12} md={5} sx={{backgroundColor:"#fff"}}>
     {/* <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
     <Typography textAlign={"center"}>Area</Typography>
     </div> */}
    {fullData.map((a, index)=>(
      <Card key={index} sx={{ display: 'flex', justifyContent:"space-between",paddingTop:2, paddingBottom:2, paddingRight:2, paddingLeft:2}}>
         <Typography variant="body2" noWrap>
        {a[0]} 

      </Typography>
      <div>
      {/* <Typography variant="body2" noWrap sx={{textAlign:"right"}}>
     {a[1][0].modeInput && `People : ${(a[1][0].modeInput).toFixed(2)}` } 
      </Typography> */}
      
      <Typography variant="body2" noWrap sx={{textAlign:"right"}}>
      {a[1][0].scopeValue && `${a[1][0].scopeValue}`}
      </Typography>
      <Typography variant="body2" noWrap> 
        {a[1][0].total && fNumber(parseInt(a[1][0].total))}
      </Typography>
</div>
</Card>
    ))}
      </Grid>
      <Grid item xs={12} md={3} sx={{display:"flex", alignItems:"center"}}>
      <RootStyle>
      {/* <IconWrapperStyle>
        <Iconify icon="ant-design:android-filled" width={24} height={24} />
      </IconWrapperStyle> */}
      {getIcon('bxs:building-house')} 
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Area
      </Typography>
      <Typography variant="h3">{fNumber(total)}</Typography>
    </RootStyle>
      </Grid>
      </Grid>
  )
}

export default Area