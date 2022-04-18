import React,{useState, useEffect} from 'react'
import { Container, Card, Box, Button, Dialog, Typography, Grid, Breadcrumbs, } from '@mui/material';
import AddSite from '../DialogForms/AddSite';
import firebase from '../../firebase'

function UpdateItem({data, block}) {
    const [visible, setvisible] = useState(false)
    const [value, setvalue] = useState(null)
    useEffect(() => {
        firebase.firestore().collection("sites").where("block_id","==",block.id).where("model","==",data.model).onSnapshot((doc)=>
        {
            if(doc.docs.length === 1)
            {
                doc.forEach(doc => {
                    setvalue(doc.data())
                  })
               
                setvisible(true)                
            }
            else{

            }
        })
    }, [data])
    
    let tag= data
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
      };
  
      const getModel = (model) =>{
        setOpen(true)
      }
  return (
    <Grid item xs={12} sm={6} md={4} >
       <Dialog open={open} onClose={()=>setOpen(false)}>
      <AddSite model={tag}  block={block} data={handleClose}  />
      </Dialog>
    <Card sx={{display: 'flex', alignItems:"center",  p: 3 }}>
    <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
      <Typography variant="subtitle1" noWrap>
        { tag.model} 
      </Typography> 
      <Typography variant="subtitle2" noWrap>
    {value && `Current Value : ${value.scopeValue}`}
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
    </Card>    
       </Grid>
  )
}

export default UpdateItem