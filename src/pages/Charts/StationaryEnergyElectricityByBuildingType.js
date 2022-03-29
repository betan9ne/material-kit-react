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

const StationaryEnergyElectricityByBuildingType =({nb}) => {
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
  }, [nb])
  
  function viewSiteInfo() {
    let data = [];


    firebase.firestore().collection("sites").where("neighbourhood_id", "==", nb.id).where("model_tag", "==", "Buildings").get().then((doc) => {
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
            l/100
          )),

        },
        {
          name: 'Lighting External',
          data: lighting_external.map((b)=>(
            b
          )),

        },
        {
          name: 'Appliances',
          data: appliances.map((a)=>(
            a
          )),

        },
        {
          name: 'Space Heating',
          data: space_heating.map((a)=>(
            a
          )),
 
        },
          {
            name: 'Cooling',
          data: cooling.map((a)=>(
            a
          )),

        },
        {
          name: 'Water heating',
          data: water_heating.map((a)=>(
            a
          )),

        },
        {
          name: 'Cooking',
          data: cooking.map((a)=>(
            a
          ))
        },  
      ]
    };

    const chartOptions = merge(BaseOptionChart(), {
      legend: { floating: true, horizontalAlign: 'center',  },
      
        chart: {
          type: 'bar',
          height: 400,
          stacked: true,
          toolbar:{
            show:true
          },
        },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories:stackedData_.map((a)=>(
          a.l
        ))
      },
      tooltip: {
        y: {
          formatter: (val) => `$${val}`
        }
      }
    });
  


   
      // const chartOptions2 = merge(BaseOptionChart(), {
      //   colors: [
      //     theme.palette.primary.main,
      //     theme.palette.info.main,
      //     theme.palette.warning.main,
      //     theme.palette.error.main
      //   ],
      //   labels: baselineEmissions.map((a)=>(
      //       a.label
      //     )),
      //   stroke: { colors: [theme.palette.background.paper] },
      //   legend: { floating: true, horizontalAlign: 'center' },
      //   dataLabels: { enabled: true, dropShadow: { enabled: false } },
      //   tooltip: {
      //     fillSeriesColor: false,
      //     y: {
      //       formatter: (seriesName) => fNumber(seriesName),
      //       title: {
      //         formatter: (seriesName) => `${seriesName}`
      //       }
      //     }
      //   },
      //   plotOptions: {
      //     pie: { donut: { labels: { show: false } } }
      //   }
      // });
   
  return (
    <>
     <Card>
      <CardHeader title="Stationery Energy (Electricity) By Building Type" />
      <ChartWrapperStyle dir="ltr">
      <ReactApexChart options={chartOptions} series={state.series} type="bar" height={300} />
      </ChartWrapperStyle>
    </Card>    
</>
            
         
  )
}

export default StationaryEnergyElectricityByBuildingType