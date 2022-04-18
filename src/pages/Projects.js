// material
import { Box, Grid, Container, Typography,  Button, Dialog } from '@mui/material';
import { Link, Link as RouterLink, useLocation } from 'react-router-dom';
// components
import Page from '../components/Page';
import { useState} from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';
import useGetNeighbourhood from 'src/hooks/useGetNeighbourhood';
import AddNeighborhoods from './DialogForms/AddNeighborhoods';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));



function Projects() {
  const [open, setOpen] = useState(false);
  let docs = useGetNeighbourhood().docs

  const handleClose = () => {
    setOpen(false);
  };
console.log(docs)
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
      <Dialog open={open} onClose={()=>setOpen(false)}>
      <AddNeighborhoods data={handleClose}/>
      </Dialog>
        <Grid container spacing={3} style={{}}>
        <Grid item xs={12} sm={12} md={12}>
        <CardContent
        sx={{
          color: 'grey.800',
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4">
      Projects
        </Typography>
       
      </CardContent>
        </Grid>
          <Grid item xs={12} sm={6} md={4} style={{textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center"}}  >
          <Button variant="contained" color="primary" onClick={()=>setOpen(true)}>
          +
New Neighborhood
</Button>
          </Grid>
         {
           
           docs.map((a, index)=>(
           
            <Grid item xs={12} sm={6} md={4} style={{textAlign:"center"}}>
            <RootStyle>
            <Link  to="/Neighborhoods"
            state={{data:a}}
             style={{ display: 'grid', color:"inherit", textDecoration:"none", justifyContent:"center",  }}>
              <Typography variant="h4" sx={{ opacity: 0.72 }}>
                {a.neighbourhood}
              </Typography>
              
              <Typography variant="subtitle1">Click to view neighborhood</Typography>
                </Link>
             
              </RootStyle>
          </Grid>
           ))
         }
        </Grid>
      </Container>
    </Page>
  );
}


export default Projects