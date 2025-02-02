import React,{useState, useEffect} from 'react'
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader,Container, Grid } from '@mui/material';
// utils
import { fNumber } from '../../utils/formatNumber';
//
import { BaseOptionChart } from '../../components/charts';
import firebase from './../../firebase'
const CHART_HEIGHT = 482;
const LEGEND_HEIGHT = 42;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5), 
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

const StationaryEnergyElectricityByBuildingType =({nb, selected, chartType}) => {
    const theme = useTheme();
  
    const [labels, setlabels] = useState([])
    const [stackedData_, setstackedData] = useState([])
  const [lighting, setLighting] = useState([])
  const [lighting_external, setLightingExternal] = useState([])
  const [appliances, setAppliances] = useState([])
  const [cooking, setCooking] = useState([])
  const [cooling, setCooling] = useState([])
  const [space_heating, setSpaceHeating] = useState([])
  const [water_heating, setWaterHeating] = useState([])
  

  useEffect(() => {
    viewSiteInfo()
  }, [nb, selected])
  
  function viewSiteInfo() {
    let data = [];
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

    firebase.firestore().collection("sites").where(chart, "==", selected.id).where("model_tag", "==", "Buildings").get().then((doc) => {
      doc.docs.forEach(document => {
        const nb = {
          id: document.id,
          ...document.data()
        };
        data.push(nb);
      });

      let group = data.reduce((r, e) => {
        let l = e.model;
        if (!r[l])
          r[l] = { l, values: [e] };
        else
          r[l].values.push(e);
        return r;
      }, {});
      createStackData(Object.values(group));
      setlabels(Object.keys(group));
      setstackedData(Object.values(group));

    });
  }
const createStackData = (data) =>{
let lighting = []
let lighting_external = []
let cooking = []
let cooling = []
let water_heating = []
let space_heating = []
let appliances = []
  
data.map((a)=>{     
     let asd = a.values.map(item => item.lighting).reduce((prev, curr) => prev + curr, 0)
     lighting.push(asd)   
})
setLighting(lighting)
data.map((a)=>{     
  let asd = a.values.map(item => item.lighting_external).reduce((prev, curr) => prev + curr, 0)
  lighting_external.push(asd)   
})

data.map((a)=>{     
let asd = a.values.map(item => item.cooking).reduce((prev, curr) => prev + curr, 0)
cooking.push(asd)   
})

data.map((a)=>{     
let asd = a.values.map(item => item.appliances).reduce((prev, curr) => prev + curr, 0)
appliances.push(asd)   
})

data.map((a)=>{     
let asd = a.values.map(item => item.cooling).reduce((prev, curr) => prev + curr, 0)
cooling.push(asd)   
})

data.map((a)=>{     
let asd = a.values.map(item => item.space_heating).reduce((prev, curr) => prev + curr, 0)
space_heating.push(asd)   
})

data.map((a)=>{     
let asd = a.values.map(item => item.water_heating).reduce((prev, curr) => prev + curr, 0)
water_heating.push(asd)   
}) 

   setLightingExternal(lighting_external)
   setCooking(cooking)
  setCooling(cooling)
 setSpaceHeating(space_heating)
   setWaterHeating(water_heating)
setAppliances(appliances)
}

  let  state = {
      series: [
        {
          name: 'Lighting',
          data:   lighting.map((l)=>(
           ( l/100).toFixed(2)
          )),

        },
        {
          name: 'Lighting External',
          data: lighting_external.map((b)=>(
            (b/100).toFixed(2)
          )),

        },
        {
          name: 'Appliances',
          data: appliances.map((a)=>(
            (a/100).toFixed(2)
          )),

        },
        {
          name: 'Space Heating',
          data: space_heating.map((a)=>(
            (a/100).toFixed(2)
          )),
 
        },
          {
            name: 'Cooling',
          data: cooling.map((a)=>(
           (a/100).toFixed(2)
          )),

        },
        {
          name: 'Water heating',
          data: water_heating.map((a)=>(
            (a/100).toFixed(2)
          )),

        },
        {
          name: 'Cooking',
          data: cooking.map((a)=>(
            (a/100).toFixed(2)
          ))
        },  
      ]
};

    const chartOptions = merge(BaseOptionChart(), {
      legend: {  horizontalAlign: 'center',  },
      colors: [
        theme.palette.primary.main,
        theme.palette.info.main,
        theme.palette.warning.main,
        theme.palette.error.main,
        theme.palette.primary.light,
        theme.palette.info.light,
        theme.palette.warning.light,
        theme.palette.error.light,
        theme.palette.primary.dark,
        theme.palette.info.dark,
        theme.palette.warning.dark,
        theme.palette.error.dark,
      ],
       
        chart: {
          type: 'bar',
          height: 500,
          stacked: true,        
          toolbar:{
            show:true
          },
          animations: {
            enabled: false
          }
        },
   

      xaxis: {
        
        categories:stackedData_.map((a)=>(
          a.l
        ))
      },
      tooltip: {
        y: {
          formatter: (val) => fNumber(val)
        }
      }
    })
    ;
  
   
  return (
    <>
     <Card>
      <CardHeader title="Stationary Energy (Electricity) By Building Type" />
      <ChartWrapperStyle dir="ltr">
      <ReactApexChart options={chartOptions} series={state.series} type="bar" height={400} />
      </ChartWrapperStyle>
    </Card>    
</>
            
         
  )
}

export default StationaryEnergyElectricityByBuildingType