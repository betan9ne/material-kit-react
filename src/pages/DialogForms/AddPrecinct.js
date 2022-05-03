import { useFormik } from 'formik';
import { useState, useEffect} from 'react';

// material

import { Button, Dialog, Container, Typography,  TextField, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
// components
import firebase from '../../firebase'

function AddPrecinct({data, item}) {
   
    const [values, setValues] = useState();

    const addprecinct = ()=>{
        firebase.firestore().collection('precinct').add(
            {precint: values, 
                neighbourhood_id: item.id,
                neighbourhood_name: item.neighbourhood,
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
    <DialogTitle>Precinct</DialogTitle>
    <DialogContent>
      <DialogContentText>
       Add a new Precinct to <b>{item.neighbourhood}</b> Neighbourhood in the field below.
      </DialogContentText>
      <TextField autoFocus fullWidth type="text" margin="dense"
       onChange={handleChange()}
        variant="outlined" label="Enter name of Precinct here" />
    </DialogContent>
    <DialogActions>
      <Button color="inherit" onClick={()=>data()}>
        Cancel
      </Button>
      <Button variant="contained" onClick={()=>addprecinct()}>
        Save
      </Button>
    </DialogActions>
    </>
  )
}

export default AddPrecinct