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

const CarbonEmissionsBaseline =({data}) => {
    const theme = useTheme();
    const [graphSummaries, setgraphSummaries] = useState([])
    const [baselineEmissions, setbaselineEmissions] = useState([])

    let infrastructure = 0
    let transport = 0
    let energy = 0
    let gas = 0

    useEffect(() => {
       getData(data)
    }, [data])


    const getData = (_data) =>{     
     
        _data.filter((val)=>{
           
          if(val.model_tag === "Infrastructure")
          {
            infrastructure +=val.total
          }
      
          if(val.model_tag === "Transport")
          {
           transport +=val.total
          }
      
          if(val.model_tag === "Buildings")
          {
           energy +=val.total_carbon_emissions_electricity
          }
          if(val.model_tag === "Buildings")
          {
           gas +=val.total_carbon_emissions_gas
          }                
        }
        )
          let asd =[       
            {
              label: "Transport",
              data : transport
            },
            {
              label : "Stationery Energy (Electricity)",
              data : energy
            },
            {
              label : "Stationery Energy (Gas)",
              data : gas
            }
          ]
      
          let scopeData = [
            {
              label : "Scope 2",
              data : energy + infrastructure
            },
            {
              label : "Scope 1",
              data : gas + transport
            }
          ]     
         
          setbaselineEmissions(asd)
          setgraphSummaries(scopeData)
       
      }     
 
   
      const chartOptions2 = merge(BaseOptionChart(), {
        colors: [
          theme.palette.primary.main,
          theme.palette.info.main,
          theme.palette.warning.main,
          theme.palette.error.main
        ],
        labels: baselineEmissions.map((a)=>(
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
     <Card>
      <CardHeader title="Carbon Emission Baseline" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={baselineEmissions.map((a)=>(
              a.data/1000
            ))} options={chartOptions2} height={280} />
      </ChartWrapperStyle>
    </Card>    
</>
            
         
  )
}

export default CarbonEmissionsBaseline