import { useFormik } from 'formik';
import { useState, useEffect} from 'react';
import useConstants from './../../hooks/useConstants'
// material

import { Button, Dialog, Container, Typography,  TextField, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
// components
import firebase from '../../firebase'

function AddSite({model, block, data}) {
    let constantData = useConstants().docs
    const [values, setValues] = useState();
    const [scopeValue, setscopeValue] = useState("")
    const [modelInput1, setmodelInput1] = useState("")
      
    const handleChange = (value, category, tag) => {
        console.log(value, category)
        if(tag === 2){
            setmodelInput1(value)
        }
        else{
            setscopeValue(value)
        }
            
       //     setcategory(category)
      }

      console.log(model, block, data)
      const calculate  =() =>{
   
        let electricity = constantData[2].value 
        let gas = constantData[1].value 
        if(model.tag === "Transport")
                {
            //transport object
            let asd = {
                precinct_id: block.precinct_id,
                neighbourhood_id: block.neighbourhood_id,
                block_id: block.id,
                model:model.model,
                model_tag: model.tag,
                modeInput: modelInput1,
                scopeValue : scopeValue,
                total: scopeValue * modelInput1 * model.emissions
            }
            console.log(asd)
            //end of transport object
       sendToDB(asd)
            return
        }
        else if(model.tag === "Infrastructure")
        {
        //infrastructure object
        let asd = {
            precinct_id: block.precinct_id,
            neighbourhood_id: block.neighbourhood_id,
            block_id: block.id,
            model:model.model,
            model_tag: model.tag,
            scopeValue : scopeValue,
            total: scopeValue * model.watts * model.hours
        }
        //end of infrastrucure object
       sendToDB(asd)
        return
        }
else if(model.tag === "Residential Pools")
{
            //residential  object
            let asd = {
                precinct_id: block.precinct_id,
                neighbourhood_id: block.neighbourhood_id,
                block_id: block.id,
                model:model.model,
                model_tag: model.tag,
                scopeValue : scopeValue,
                total: scopeValue * model.watts * model.hours *electricity
            }
            sendToDB(asd)
            //end of residential object
}

        else if(model.tag=== "Buildings")
        {
  //buildings object
  let f1 = (parseInt(scopeValue) * parseInt(model.electricity) * electricity)
  let f2 = (parseInt(scopeValue) * parseInt(model.gas) * gas)
  let asd = {
      precinct_id: block.precinct_id,
      neighbourhood_id: block.neighbourhood_id,
      block_id: block.id,
      model:model.model,
      model_tag: model.tag,
      scopeValue : scopeValue,
      total_carbon_emissions_electricity : parseInt(scopeValue) * parseInt(model.electricity) * electricity,
      lighting :f1 * model.lighting,
      lighting_external : f1*model.lighting_external/100,
      appliances : f1*model.appliances/100,
      space_heating : f1*model.space_heating/100,
      cooling : f1*model.cooling/100,
      water_heating: f1*model.water_heating/100,
      pool_pump: f1*model.pool_pump/100,
      cooking: f1*model.cooking/100,
      gas_water_heating: f2*model.gas_water_heating/100,
      gas_cooking: f2*model.gas_cooking/100,
      total_carbon_emissions_gas : parseInt(scopeValue) * parseInt(model.gas) * gas,     
  }
  //end of buildings
 sendToDB(asd)
 return
       }    
    
  }

      const sendToDB = (object) =>{
        firebase.firestore().collection("sites").where("block_id","==",block.id).where("model","==",model.model).get().then((doc)=>{
            if(doc.docs.length === 1)
            {
                console.log(doc.docs[0].id)
               firebase.firestore().collection("sites").doc(doc.docs[0].id).update(object).then(()=>{
                //  setcurrentForm("")
                console.log("done")
                data()
               }).catch((e)=>{
                   alert(e)
               })
               return
            }
            else{
                firebase.firestore().collection("sites").add(object).then((doc)=>{
                 //  alert("scope added")
               //  setcurrentForm("")
               console.log("done")
               data()
                }).catch((e)=>{
                    alert(e)
                })
            }            
        }) 
    }


  return (
    <>
    <DialogTitle>Update {model.model} Site values</DialogTitle>
    <DialogContent>
      <DialogContentText>
       
      </DialogContentText>


      {model.tag === "Transport" ? <>
                <TextField autoFocus fullWidth type="number" margin="dense"
                onChange={(e) => handleChange(e.target.value, model)}
                    variant="outlined" label="Enter number of cars" />
                <TextField autoFocus fullWidth type="number" margin="dense"
                onChange={(e) => handleChange(e.target.value, model, 2)}
                    variant="outlined" label="Enter number of Kms annually" />
       
                      </> : <>            
                            
            </>
            }

            {model.tag === "Infrastructure" ? <>
            <TextField autoFocus fullWidth type="number" margin="dense"
                onChange={(e) => handleChange(e.target.value, model)}
                    variant="outlined" label="Enter number of street lights" />
                          </> : <>            
                             
            </>
            }

            {model.tag === "Buildings" ? <>
            <TextField autoFocus fullWidth type="number" margin="dense"
                onChange={(e) => handleChange(e.target.value, model)}
                    variant="outlined" label="Enter area" />
                     </> : <>            
                             
            </>
            } 
        
            {model.tag === "Residential Pools" ? <>
            <TextField autoFocus fullWidth type="number" margin="dense"
                onChange={(e) => handleChange(e.target.value, model)}
                    variant="outlined" label="Enter area" />
                     </> : <>            
                             
            </>
            } 
    </DialogContent>
    <DialogActions>
    {scopeValue.length === 0 ? null  :
    <><Button color="inherit" onClick={()=>data()} >
        Cancel
      </Button>
      <Button variant="contained" onClick={()=>calculate()}>
      Calculate and Save
      </Button>
     </>}
   
    </DialogActions>
    </>
  )
}

export default AddSite