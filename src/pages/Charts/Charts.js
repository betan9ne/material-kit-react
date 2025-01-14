// material
import { Box, Grid, Container, Typography, Switch,  Breadcrumbs, Link} from '@mui/material';
// components
import Page from '../../components/Page';

import OutputSummary from './OutputSummary'
import { Block } from '../../components/Block';
import Inputs from './Inputs';
import CarbonEmissionsBaseline from './CarbonEmissionsBaseline';
import TransportEmissions from './TransportEmissions';
import StationaryEnergyElectricity from './StationaryEnergyElectricity.js';
import StationaryEnergyGas from './StationaryEnergyGas';
import StationaryEnergyElectricityByBuildingType from './StationaryEnergyElectricityByBuildingType';
import StationaryEnergyElectricityByEndUse from './StationaryEnergyElectricityByEndUse';
// ----------------------------------------------------------------------

export default function Charts({data, nb, selected, chartType}) {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
        <Grid xs={12} md={12} sx={{marginLeft:5}}>
        <br/><rb/>
          <Typography variant='h5'>Input Summary</Typography>
        </Grid>  
        <Grid item xs={12} md={12} lg={12}>
          <Inputs data={nb} selected={selected} chartType={chartType}/>
          </Grid>
        <Grid xs={12} md={12} sx={{marginLeft:5}}>
        <br/><rb/>
          <Typography variant='h5'>Output Summary</Typography>
        </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OutputSummary data={data}/>          
          </Grid>

          <Grid item xs={12} md={6} lg={4}>          
          <CarbonEmissionsBaseline data={data}/>
          </Grid> 

          <Grid item xs={12} md={6} lg={4}>
            <StationaryEnergyGas nb={nb} selected={selected} chartType={chartType}/>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <TransportEmissions  nb={nb} selected={selected} chartType={chartType}/>

          </Grid>
          <Grid item xs={12} md={6} lg={6}>
          <StationaryEnergyElectricity nb={nb} selected={selected} chartType={chartType}/>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <StationaryEnergyElectricityByBuildingType nb={nb}  selected={selected} chartType={chartType} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <StationaryEnergyElectricityByEndUse nb={nb} selected={selected} chartType={chartType} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
