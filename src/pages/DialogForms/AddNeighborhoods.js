import { useFormik } from 'formik';
import { useState, useEffect} from 'react';

// material

import { Button, Dialog, Container, Typography,  TextField, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
// components
import firebase from '../../firebase'

function AddNeighborhoods({data}) {
   
     const [values, setValues] = useState();

    const addneighbourhood = ()=>{      
        firebase.firestore().collection('neighbourhood').add(
            {
                user_id: "SotfRAniLCTensoifIlj",
                neighbourhood: values, 
                status:true, 
                createdAt: new Date().toLocaleDateString()
            }).then((d)=>{
                data()
           alert("Added Successfully")
        }).catch((e)=>{
            alert(JSON.stringify(e))
        })
    }

    const handleChange = (prop) => (event) => {
        setValues(event.target.value);
      };

  return (
   <>
    <DialogTitle>Neighborhood</DialogTitle>
    <DialogContent>
      <DialogContentText>
       Add a new Neighborhood in the field below.
      </DialogContentText>
      <TextField autoFocus fullWidth type="text" margin="dense"
       onChange={handleChange('_group')}
        variant="outlined" label="Enter name of neighborhood here" />
    </DialogContent>
    <DialogActions>
      <Button color="inherit" onClick={()=>data()}>
        Cancel
      </Button>
      <Button variant="contained" onClick={()=>addneighbourhood()}>
        Save
      </Button>
    </DialogActions>
    </>
  )
}

export default AddNeighborhoods