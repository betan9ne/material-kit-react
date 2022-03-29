import React,{useState, useEffect} from 'react'
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader,Container, Grid, Button, Menu, MenuItem } from '@mui/material';
// utils
import { fNumber } from '../../utils/formatNumber';
//
import { BaseOptionChart } from '../../components/charts';
import firebase from './../../firebase'
const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

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

const Inputs =({data}) => {

    const [isOpen, setOpen] = useState(null);
    const [isOpenList, setOpenList] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [isOpenMaxHeight, setOpenMaxHeight] = useState(null);
  
    const handleClick = (event) => {
      setOpenMaxHeight(event.currentTarget);
    };
  
    const handleClickListItem = (event) => {
      setOpenList(event.currentTarget);
    };
  
    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpenList(null);
    };
  
    const handleOpen = (event) => {
      setOpen(event.currentTarget);
    };
  
    const handleClose = () => {
      setOpen(null);
    };
  
    const handleMaxHeightClose = () => {
      setOpenMaxHeight(null);
    };

    const theme = useTheme();
    const [labels, setlabels] = useState([])
    const [_data, setdata_] = useState([])
    const [tag, settag] = useState(0)
    const [fullData, setfullData] = useState([])


    let asd = []
    useEffect(() => {
        let neighbourhood = [];
        let buildings = []
        let residential = []
        let traffic = []
        let transport = []
        firebase.firestore().collection("sites").where("neighbourhood_id","==", data.id).get().then((doc)=>{
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

                switch (tag) {
                    case 0:
                        console.log(tag)
                    asd =  Object.entries(group)
                        break;
                
                    case 1:
                        console.log(tag)
                    asd =  Object.entries(groupResidential)
                        break;
                
                    case 2:
                        console.log(tag)
                    asd =  Object.entries(groupTraffic)
                        break;
                
                    case 3:
                        console.log(tag)
                    asd =  Object.entries(groupTransport)
                        break;
                
                    default:
                        break;
                }
            
         getDataandLabels(asd)
        })
    }, [data.id, tag])

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
            return a + parseInt(b['scopeValue']);
        }, 0);
        data.push(asd) 
        })     
        let sdf  = {
            labels : label,
            data : data
        }
        setfullData(sdf)
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
      let menu = ['Area', 'People', 'Infrastructure', 'Vehicle']
  return (
    <>
     <Card>
      <CardHeader title={`${menu[tag]} Input Summary`} action={
          <>
        <Button variant="outlined" onClick={handleOpen}>
              {menu[tag]}
            </Button>
            <Menu keepMounted id="simple-menu" anchorEl={isOpen} onClose={handleClose} open={Boolean(isOpen)}>
              {menu.map((option, index) => (
                <MenuItem key={option} onClick={()=>showINfo(index)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
            </>
      } >
      
      </CardHeader>
      <ChartWrapperStyle dir="ltr">
            
 
        <ReactApexChart type="pie" series={_data} options={chartOptions2} height={280} />
      </ChartWrapperStyle>
    </Card>    
</>
            
         
  )
}

export default Inputs