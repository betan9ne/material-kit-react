import React,{useState, useEffect} from 'react'
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import {  Button, CardHeader, Grid, Card} from '@mui/material';
// utils
import { fNumber } from '../../utils/formatNumber';
//
import { BaseOptionChart } from '../../components/charts';
import firebase from './../../firebase'
import Iconify from '../../components/Iconify';
import Area from '../Tables/Area';
import Infrastructure from '../Tables/Infrastructure';
import People from '../Tables/People';
import Vehicles from '../Tables/Vehicles';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={30} height={30} />;
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

const Inputs =({data,  selected, chartType}) => {

    const [isOpen, setOpen] = useState(null);
    const [checked, setChecked] = useState(false)

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    const handleOpen = (event) => {
      setOpen(event.currentTarget);
    };
  
    const handleClose = () => {
      setOpen(null);
    };

    const theme = useTheme();
    const [labels, setlabels] = useState([])
    const [_data, setdata_] = useState([])
    const [tag, settag] = useState(0)
    const [fullData, setfullData] = useState([])

    const [area, setarea] = useState([])
    const [people, setpeople] = useState([])
    const [infrastructure, setinfrastructure] = useState([])
    const [vehicle, setvehicle] = useState([])

    let menu = ['Area', 'People', 'Infrastructure', 'Vehicle']
 
    let asd = []

    useEffect(() => {
        let neighbourhood = [];
        let buildings = []
        let residential = []
        let traffic = []
        let transport = []
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
            doc.docs.forEach(document => {
             const nb = {
               id: document.id,
               ...document.data()
             }
             neighbourhood.push(nb)
           })
           
                neighbourhood.filter((val)=>{
             if(val.model_tag === "Buildings")
             {
               buildings.push(val)
             }
             if(val.model.includes("Residential"))
             {
                residential.push(val)
             }
             if(val.model_tag === "Infrastructure")
             {
                 traffic.push(val)
             }   
             if(val.model_tag === "Transport")
             {
                 transport.push(val)
             }             
           })      
               let groupResidential = residential.reduce((r, a)=>{
                   r[a.model] = [...r[a.model] || [], a]
                   return r
               }, {})

               let group = buildings.reduce((r, a) => {
                r[a.model] = [...r[a.model] || [], a];
                return r;
                }, {}); 
                
                let groupTraffic = traffic.reduce((r, a) => {
                    r[a.model] = [...r[a.model] || [], a];
                    return r;
                }, {}); 

                let groupTransport = transport.reduce((r, a) => {
                    r[a.model] = [...r[a.model] || [], a];
                    return r;
                }, {}); 
              
                setarea(Object.entries(group))
                setpeople(Object.entries(groupResidential))
                setinfrastructure(Object.entries(groupTraffic))
                setvehicle(Object.entries(groupTransport))

                // switch (tag) {
                //     case 0:
                      
                //     asd =  Object.entries(group)
                //         break;
                
                //     case 1:
                //      asd =  Object.entries(groupResidential)
                //         break;
                
                //     case 2:
                //       asd =  Object.entries(groupTraffic)
                //         break;
                
                //     case 3:
                //      asd =  Object.entries(groupTransport)
                //         break;
                
                //     default:
                //         break;
                // }
            
         getDataandLabels(asd)
        })
    }, [selected, tag])

    const showINfo = (tag) =>{
        settag(tag)
        setOpen(null);
    }

    const getDataandLabels = (_data) =>{
     
        let label = []
        let data = []
        
        _data.forEach(e=>{
            label.push(e[0])           
            let asd = e[1].reduce( function(a, b){
            return a + parseFloat(b[tag === 0 || tag === 1 ? 'scopeValue' : 'total']);
              }, 0);
           data.push(asd) 
        })     
        let sdf  = {
            labels : label,
            data : data
        }
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
    

  return (
    <div style={{}}>
   
      <CardHeader title="Input Summary">
      
      </CardHeader>
 
      <Grid container spacing={3} sx={{marginTop:5}}>
      <Grid style={{display:"flex", gridAutoColumns:"1fr", gridAutoFlow:"column"}} item xs={12}>
      
          <Area data={area}/>
 
      </Grid> 
      <Grid style={{display:"flex", height:520, overflowY:"scroll", gridAutoColumns:"1fr", gridAutoFlow:"column"}} item xs={6} spacing={1}>
      <Vehicles data={vehicle}/>
      </Grid>    
      <Grid style={{display:"flex", height:520, overflowY:"hidden", gridAutoColumns:"1fr", gridAutoFlow:"column", marginTop:20}} item xs={6} spacing={1}>
      <Infrastructure data={infrastructure}/>
      </Grid> 
      <Grid style={{display:"flex", height:520, overflowY:"hidden", gridAutoColumns:"1fr", gridAutoFlow:"column",  marginTop:20}} item xs={6} spacing={1}>
      <People data={people}/>
      </Grid>    
 
</Grid>
{/*      
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={_data} options={chartOptions2} height={280} />
      </ChartWrapperStyle>} */}
     
</div>
            
         
  )
}

export default Inputs