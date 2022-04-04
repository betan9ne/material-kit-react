import React,{useState, useEffect} from 'react'
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader,Typography, Switch, Box, Grid} from '@mui/material';
// utils
import { fNumber } from '../../utils/formatNumber';
//
import { BaseOptionChart } from '../../components/charts';
import firebase from '../../firebase';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

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

const TransportEmissions =({nb, selected, chartType}) => {
    const theme = useTheme();
 
    let asd=[]
    const [_data, setdata_] = useState([])
    const [labels, setlabels] = useState([])
    const [checked, setChecked] = useState(false)
    useEffect(() => {
      viewSiteInfo("Transport")
    }, [nb, selected])

    const viewSiteInfo = (tag) =>{
        let neighbourhood = [];
        let buildings = []
        let chart = null
        if(chartType === 0 )
        {
          chart = "neighbourhood_id"
        }
        else if(chartType === 1 )
        {
          chart = "precinct_id"
        }
        else if(chartType === 2 )
        {
          chart = "block_id"
        }
        
 
         firebase.firestore().collection("sites").where(chart,"==", selected.id).get().then((doc)=>{
          console.log("id", selected.id, chart)
             doc.docs.forEach(document => {
              const nb = {
                id: document.id,
                ...document.data()
              }
              neighbourhood.push(nb)
            })
                 neighbourhood.filter((val)=>{
              if(val.model_tag === tag)
              {
                buildings.push(val)
              }
            })
             //  getGasData(neighbourhood)
             
           let group = buildings.reduce((r, a) => {
            r[a.model] = [...r[a.model] || [], a];
         return r;
        }, {});           
        
       asd = Object.entries(group)

           getDataandLabels(asd)
                      })
    }

    const getDataandLabels = (_data) =>{
      let label = []
      let data = []
      
      _data.forEach(e=>{
        label.push(e[0])
         
        let asd = e[1].reduce( function(a, b){
          return a + parseInt(b['scopeValue']);
      }, 0);
      data.push(asd) 
      })
   
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
        labels: labels.map((a)=>(
            a
          )),
        stroke: { colors: [theme.palette.background.paper] },
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
        plotOptions: {
          pie: { donut: { labels: { show: false } } }
        }
      });
      const handleChange = (event) => {
        setChecked(event.target.checked);
      };
  return (
    <>
     <Card>
      <CardHeader title="Transport Emission" />
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Switch 
               checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography>Show {checked ? "Charts" : "Figures"}</Typography>
            </div>

            {checked ? 
      <Grid container xs={12} spacing={1}>
        
        {_data.map((s) => (
          <Grid key={s.id} item xs={12} md={12}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {s.label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {(s.data/1000).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    
  
    </Card>
          </Grid>
        ))}
      </Grid>
    
     :
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={_data.map((a)=>(
              a
            ))} options={chartOptions2} height={280} />
      </ChartWrapperStyle>}
    </Card>    
</>
            
         
  )
}

export default TransportEmissions