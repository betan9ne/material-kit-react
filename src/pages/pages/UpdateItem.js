import React,{useState, useEffect} from 'react'
import { Container, Card, Box, Button, Dialog, Typography, Grid, Breadcrumbs, } from '@mui/material';
import AddSite from '../DialogForms/AddSite';
import firebase from '../../firebase'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateItem({data, block}) {
  const [openSnack, setOpenSnack] = useState(false);
    const [visible, setvisible] = useState(false)
    const [value, setvalue] = useState(null)
    useEffect(() => {
      check()
    }, [data])
    
const check=()=>{
  firebase.firestore().collection("sites").where("block_id","==",block.id).where("model","==",data.model).onSnapshot((doc)=>
  {
      if(doc.docs.length === 1)
      {
          doc.forEach(doc => {
              setvalue({
                id: doc.id,
                ...doc.data()})
            })
         
          setvisible(true)                
      }
      else{
        setvisible(false)    
      }
  })
}

    let tag= data
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
      };
  
      const getModel = (model) =>{
        setOpen(true)
      }

      const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnack(false);
      };

      const deleteSite =(id) =>{
        firebase.firestore().collection("sites").doc(id).delete().then(()=>{
                setOpenSnack(true)
                check()
        }).catch((e)=>{
            alert("Failed to delete item.")
        })
    }
  return (
    <Grid item xs={12} sm={6} md={4} >
 <Snackbar open={openSnack} autoHideDuration={5000} onClose={handleSnackClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Site deleted successfully
        </Alert>
      </Snackbar>

       <Dialog open={open} onClose={()=>setOpen(false)}>
      <AddSite model={tag}  block={block} data={handleClose}  />
      </Dialog>
    <Card sx={{display: 'flex', alignItems:"center",  p: 3 }}>
    <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
      <Typography variant="subtitle1" noWrap>
        { tag.model} 
      </Typography> 
      <Typography variant="subtitle2" noWrap>
    {value && `Current Value : ${value.total === undefined ? value.scopeValue : value.total}`}
      </Typography> 
    </Box>
  
    <Button
      size="small"
      onClick={()=>getModel(tag)}
      variant={visible ? 'outlined' : 'contained'}
      color={'primary'}
    >
    {visible ? "Edit" : "Add"}
    </Button>

    {!visible? null :   <Button onClick={()=>deleteSite(value.id)} size="small"
        variant={'outlined'}
      color={'error'}>
      
      Delete
    </Button>}
    </Card>    
       </Grid>
  )
}

export default UpdateItem