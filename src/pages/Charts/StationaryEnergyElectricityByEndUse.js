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
const CHART_HEIGHT = 572;
const LEGEND_HEIGHT = 152;

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

const StationaryEnergyElectricityByEndUse =({nb, selected, chartType}) => {
    const theme = useTheme();
    const [Religous, setReligous] = useState([])
    const [Education, setEducation] = useState([])
   const [Government, setGovernment] = useState([])
   const [MuncipalOffice, setMuncipalOffice] = useState([])
   const [PublicOpenSpace, setPublicOpenSpace] = useState([])
   const [PublicServiceInfrastructure, setPublicServiceInfrastructure] = useState([])
   const [BusinessCommercial, setBusinessCommercial] = useState([])
   const [VacantLand, setVacantLand] = useState([])
   const [WarehouseLight, setWarehouseLight] = useState([])
   const [warehouseMed, setwarehouseMed] = useState([])
   const [warehouseHigh, setwarehouseHigh] = useState([])
   const [ResidentialLow, setResidentialLow] = useState([])
   const [ResidentialMed, setResidentialMed] = useState([])
   const [ResidentialHigh, setResidentialHigh] = useState([])
 
   let labels = ["Lighting", "Lighting External", "Appliances", "Space Heating", "Cooling", "Water Heating", "Cooking"]
 
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
      getMe(data);
      createStackData(data);
    });
  } 

const getMe = (data) =>{
 let totalLighting = 0
// console.log(data)
 data.filter((val)=>{
   if(val.model === "Residential (High Density)"){      
   
     let  data = [
       val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
       ]
       setResidentialHigh(data)
     }
     if(val.model === "Residential (Medium Density)"){      
       let  data = [
         val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
         ]
         setResidentialMed(data)
       }
       if(val.model === "Residential (Low Density)"){      
         let  data = [
           val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
           ]
           setResidentialLow(data)
         }
         if(val.model === "Warehouse (High Industrial)"){      
           let  data = [
             val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
             ]
             setwarehouseHigh(data)
           }
           if(val.model === "Warehouse (Medium Industrial)"){      
             let  data = [
               val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
               ]
               setwarehouseMed(data)
             }
             if(val.model === "Warehouse (Light Industrial)"){      
               let  data = [
                 val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
                 ]
                 setWarehouseLight(data)
               }
   if(val.model === "Business & Commercial"){ 
     let  data = [
     totalLighting = totalLighting+ (val.lighting/100), val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
     ]
     setBusinessCommercial(data)
   }
   if(val.model === "Education"){      
     let  data = [
       val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
       ]
       setEducation(data)
     }
     if(val.model === "Government"){      
       let  data = [
         val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
         ]
         setGovernment(data)
       }
       if(val.model === "Municipal Office"){      
         let  data = [
           val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
           ]
           setMuncipalOffice(data)
         }
         if(val.model === "Public Open Space"){      
           let  data = [
             val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
             ]
             setPublicOpenSpace(data)
           }
           if(val.model === "Public Service Infrastructure"){      
             let  data = [
               val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
               ]
               setPublicServiceInfrastructure(data)
             }
             if(val.model === "Religious"){      
               let  data = [
                 val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
                 ]
                 setReligous(data)
               }
               if(val.model === "Vacant Land"){      
                 let  data = [
                   val.lighting/100, val.lighting_external, val.appliances,val.space_heating, val.cooling, val.water_heating, val.cooking         
                   ]
                   setVacantLand(data)
                 }
 })
   
}

const createStackData = (data) =>{
  let lighting = [] 
data.forEach(element =>{
  
       if(element.lighting === 0)
       {
           let asd = {
               label : element.model,
               data : 0
           }
           lighting.push(asd)
       }
       else{
           let asd = {
               label : element.model,
               data : element.lighting
           }
           lighting.push(asd)
       }
     
   
})
}

const stackedData = {
   labels: labels.map((a)=>(
     a
   )),
   datasets: [         
     {
       name: 'Business & Commercial',
       data: BusinessCommercial.map((l)=>(
       (l/100).toFixed(2)
       )),
  
     },
     {
       name: 'Education',
       data: Education.map((b)=>(
        (b/100).toFixed(2)
       )),

     },
     {
       name: 'Government',
       data: Government.map((a)=>(
        (a/100).toFixed(2)
       )),

     },
     {
       name: 'Muncipal Office',
       data: MuncipalOffice.map((a)=>(
        (a/100).toFixed(2)
       )),

     },
       {
       name: 'Public Open Space',
       data: PublicOpenSpace.map((a)=>(
        (a/100).toFixed(2)
       )),

     },
     {
       name: 'Public Service Infrastructure',
       data: PublicServiceInfrastructure.map((a)=>(
        (a/100).toFixed(2)
       )),

     },
     {
       name: 'Religious',
       data: Religous.map((a)=>(
        (a/100).toFixed(2)
       )),

     },
     {
       name: 'Vacant Land',
       data: VacantLand.map((a)=>(
        (a/100).toFixed(2)
       )),

     },
     {
       name: 'Residential High Density',
       data: ResidentialHigh.map((a)=>(
        (a/100).toFixed(2)
       )),

     },
     {
       name: 'Residential Medium Density',
       data: ResidentialMed.map((a)=>(
        (a/100).toFixed(2)
       )),
     },
     {
       name: 'Residential Low Density',
       data: ResidentialLow.map((a)=>(
        (a/100).toFixed(2)
       )),
     },
     {
       name: 'Warehouse Light Industrial',
       data: WarehouseLight.map((a)=>(
        (a/100).toFixed(2)
       ))
     },
     {
       name: 'Warehouse Medium Industrial',
       data: warehouseMed.map((a)=>(
        (a/100).toFixed(2)
       )),
     },
     {
       name: 'Warehouse High Industrial',
       data: warehouseHigh.map((a)=>(
        (a/100).toFixed(2)
       ))
     },

     
    ],
    
 };

 
 const chartOptions = merge(BaseOptionChart(), {
  legend: { floating: true, horizontalAlign: 'center',  },
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
      height: 400,
      stacked: true,
      toolbar:{
        show:true
      },
      animations: {
        enabled: false
      }
    },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories:stackedData.labels.map((a)=>(
      a
    ))
  },
  tooltip: {
    y: {
      formatter: (val) => (val).toFixed(2)
    }
  }
});


  return (
    <>
     <Card>
     <CardHeader title="Stationary Energy (Electricity) By End Use" />
      <ChartWrapperStyle dir="ltr">
      <ReactApexChart options={chartOptions} series={stackedData.datasets} type="bar" height={400} />
      </ChartWrapperStyle>
    </Card>    
</>
            
         
  )
}

export default StationaryEnergyElectricityByEndUse