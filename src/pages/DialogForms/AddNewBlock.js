import { useFormik } from 'formik';
import React, { useState, useEffect} from 'react';

// material

import { Button, Dialog, Container, Typography,  TextField, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
// components
import firebase from '../../firebase'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddNewBlock({data, item}) {
  const [openSnack, setOpenSnack] = useState(false);
    const [values, setValues] = useState();

    const addblock = ()=>{
        firebase.firestore().collection('blocks').add(
            {block: values, 
            precinct_id : item.id,
            neighbourhood_id: item.neighbourhood_id,
            createdAt: new Date().toLocaleDateString()
            }).then((d)=>{
              
            data()
            setOpenSnack(true)
        }).catch((e)=>{
            alert(JSON.stringify(e))
        })
    }
    const handleSnackClose = (event, reason) => {
      // if (reason === 'clickaway') {
      //   return;
      // }
  
      setOpenSnack(false);
    };

    const handleChange = (prop) => (event) => {
        setValues(event.target.value);
      };

  return (
   <>
    <DialogTitle>Block</DialogTitle>
    <Snackbar open={openSnack} autoHideDuration={5000} onClose={handleSnackClose}>
        <Alert severity="info" sx={{ width: '100%' }}>
          Site deleted successfully
        </Alert>
      </Snackbar>
    <DialogContent>
      <DialogContentText>
       Add a new Block to <b>{item.precint}</b> Precinct in the field below.
      </DialogContentText>
      <TextField autoFocus fullWidth type="text" margin="dense"
       onChange={handleChange()}
        variant="outlined" label="Enter name of block here" />
    </DialogContent>
    <DialogActions>
      <Button color="inherit" onClick={()=>data()}>
        Cancel
      </Button>
      <Button variant="contained" onClick={()=>addblock()}>
        Save
      </Button>
    </DialogActions>
    </>
  )
}

export default AddNewBlock