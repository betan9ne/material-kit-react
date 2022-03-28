import { useFormik } from 'formik';
import { useState, useEffect} from 'react';
import { Icon } from '@iconify/react';
// material
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container, Accordion, AccordionSummary, Button, Typography, Grid, Paper,  ListItemText,  List, ListItem,ListItemAvatar, TextField } from '@mui/material';
// components
import Page from '../components/Page';
import useGetModels from 'src/hooks/useGetModels';
import useGetNeighbourhood from 'src/hooks/useGetNeighbourhood';
import OutputSummary from './Charts/OutputSummary';
import firebase from './../firebase'

function UpdateValues() {
    let location = useLocation()
    let data = location.state.data.block
    console.log(location.state.data)
  return (
    <Page title="Dashboard">
   <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
            Update {data}
      </Typography>
      </Container>
      </Page>
  )
}

export default UpdateValues