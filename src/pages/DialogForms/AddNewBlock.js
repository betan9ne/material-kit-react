import { useFormik } from 'formik';
import { useState, useEffect} from 'react';

// material

import { Button, Dialog, Container, Typography,  TextField, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
// components
import firebase from '../../firebase'

function AddNewBlock({data, item}) {
   
    const [values, setValues] = useState();

    const addblock = ()=>{
        firebase.firestore().collection('blocks').add(
            {block: values, 
            precinct_id : item.id,
            neighbourhood_id: item.neighbourhood_id,
            createdAt: new Date().toLocaleDateString()
            }).then((d)=>{
            data()
        }).catch((e)=>{
            alert(JSON.stringify(e))
        })
    }


    const handleChange = (prop) => (event) => {
        setValues(event.target.value);
      };

  return (
   <>
    <DialogTitle>Block</DialogTitle>
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