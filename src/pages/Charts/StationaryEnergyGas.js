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

const StationaryEnergyGas =({nb, selected, chartType}) => {
    const theme = useTheme();
    let asd=[]
    const [_data, setdata_] = useState([])
    const [labels, setlabels] = useState([])
    const [gasData, setgasData] = useState()
    useEffect(() => {
      viewSiteInfo(selected, "Gas")
    }, [nb, selected])

    const viewSiteInfo = (selected, tag) =>{
     
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
              getGasData(neighbourhood)
                       
                      })
    }

    const getGasData = (data)=>{
   

      let total_water_heating = 0
      let total_gas_cooking = 0
    
        data.filter((val)=>{
          if(val.gas_water_heating){
            total_water_heating  = total_water_heating + val.gas_water_heating
          }
          if(val.gas_cooking){
            total_gas_cooking = total_gas_cooking + val.gas_cooking
          }
        })
    
        let asd = [
          {
            label : "Water Heating",
            data : total_water_heating
          },
          {
            label :"Cooking",
            data : total_gas_cooking
          }
        ]
         
     setgasData(asd)
     }

  
      const chartOptions2 = merge(BaseOptionChart(), {
        colors: [
          theme.palette.primary.main,
          theme.palette.info.main,
          theme.palette.warning.main,
          theme.palette.error.main
        ],
        labels: gasData && gasData.map((a)=>(
            a.label
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
  return (
    <>
    {gasData &&  <Card>
      <CardHeader title="Stationary Energy (Gas)" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={gasData.map((a)=>(
              a.data
            ))} options={chartOptions2} height={280} />
      </ChartWrapperStyle>
    </Card>    }
</>
            
         
  )
}

export default StationaryEnergyGas