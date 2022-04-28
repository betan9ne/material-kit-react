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

const getIcon = (name) => <Iconify icon={name} width={40} height={40} />;

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
  stroke: {show:false },
  legend: { floating: true, horizontalAlign: 'center' },
  dataLabels: { enabled: true, dropShadow: { enabled: false } },
  tooltip: {
    fillSeriesColor: false,
    y: {
      formatter: (seriesName) => fNumber(seriesName),
      title: {
        formatter: (seriesName) => `${seriesName}`
      }
    }
  },
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
      <div key={index} style={{ display: 'flex', justifyContent:"space-between", borderBottom:"1px solid #e0e0e0", marginRight:"20px", marginLeft:"20px", padding:"15px 20px"}}>
         <Typography variant="body2" noWrap>
        {a[0]} 

      </Typography>
      <div>
      {/* <Typography variant="body2" noWrap sx={{textAlign:"right"}}>
     {a[1][0].modeInput && `People : ${(a[1][0].modeInput).toFixed(2)}` } 
      </Typography> */}
      
      <Typography variant="body2" noWrap sx={{textAlign:"right"}}>
      {a[1][0].scopeValue && fNumber(a[1][0].scopeValue)}
      </Typography>
      {/* <Typography variant="body2" noWrap> 
        {a[1][0].total && fNumber(parseInt(a[1][0].total))}
      </Typography> */}
</div>
</div>
    ))}
      </Grid>
      <Grid item xs={12} md={3} sx={{display:"flex", alignItems:"center"}}>
      <RootStyle>
      {getIcon('bxs:building-house')} 
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Area
      </Typography>
      <Typography variant="h2">{fNumber(total)}</Typography>
    </RootStyle>
      </Grid>
      </Grid>
  )
}

export default Area