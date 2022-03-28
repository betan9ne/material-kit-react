// material
import { Box, Grid, Container, Typography, Breadcrumbs, Link} from '@mui/material';
// components
import Page from '../../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../../sections/@dashboard/app';
import OutputSummary from './OutputSummary'
import { Block } from '../../components/Block';
import CarbonEmissionsBaseline from './CarbonEmissionsBaseline';
// ----------------------------------------------------------------------

export default function Charts({data}) {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        {/* <Box sx={{ pb: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Block title="Text" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Breadcrumbs>
                <Link color="inherit" href="#">
                  Material-UI
                </Link>
                <Link color="inherit" href="#">
                  Core
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Breadcrumb</Typography>
              </Breadcrumbs>
            </Block>
          </Grid>
          </Grid>
        </Box> */}
        <Grid container spacing={3}>
        
        <Grid item xs={12} md={6} lg={4}>
            <OutputSummary data={data}/>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CarbonEmissionsBaseline data={data}/>
          </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <AppWebsiteVisits />
          </Grid>

          

          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

         

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>
 
        </Grid>
      </Container>
    </Page>
  );
}
