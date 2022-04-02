// material
import { Box, Grid, Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,

} from '../sections/@dashboard/app';
import { alpha, styled } from '@mui/material/styles';
import { Card } from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));
// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome</Typography>
        </Box>
        <Grid container spacing={3}>
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

          <Grid item xs={12} sm={6} md={3}>
                <RootStyle>
            <Typography variant="h3">Neighborhoods</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Neighborhoods
            </Typography>
          </RootStyle>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <RootStyle>
            <Typography variant="h3">Precincts</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Neighborhoods
            </Typography>
          </RootStyle>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <RootStyle>
            <Typography variant="h3">Blocks</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Neighborhoods
            </Typography>
          </RootStyle>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <RootStyle>
            <Typography variant="h3">Sites</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Neighborhoods
            </Typography>
          </RootStyle>
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}
 
        </Grid>
      </Container>
    </Page>
  );
}
