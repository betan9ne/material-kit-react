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
import { Card, CardContent } from '@mui/material';

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
   
        <Grid container spacing={2} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>  
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

          <Grid item xs={12} sm={6} md={4}>
                <RootStyle>
            <Typography variant="h4">Neighborhoods</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              what is a Neighborhood?
            </Typography>
          </RootStyle>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <RootStyle>
            <Typography variant="h4">Precincts</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              What is a Precinct?
            </Typography>
          </RootStyle>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <RootStyle>
            <Typography variant="h4">Blocks</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              What is a Block?
            </Typography>
          </RootStyle>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <RootStyle>
            <Typography variant="h4">Sites</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              What is a Site?
            </Typography>
          </RootStyle>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
        <CardContent
        sx={{
          color: 'grey.800',
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4">
          What is EcoDistricts?
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
         Click here to learn more
        </Typography>

  
      </CardContent>
        </Grid>
 
        </Grid>
      </Container>
    </Page>
  );
}
