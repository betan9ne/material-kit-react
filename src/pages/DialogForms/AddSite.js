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
      
    const handleChange = (value, category,  tag) => {
        if(tag === 2){
            setmodelInput1(value)
        }
        else{
            setscopeValue(value)
        }
    }

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
                modeInput: parseFloat(modelInput1),
                scopeValue : parseFloat(scopeValue),
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
            scopeValue :  parseFloat(scopeValue),
            total: scopeValue * parseFloat(model.watts) *  parseFloat(model.hours)
        }
        console.log(asd,  model.watts, model.hours)
        //end of infrastrucure object
       sendToDB(asd)
        return
        }
else if(model.tag === "Residential Pools")
{
    let electricity = constantData[2].value 
            //residential  object
            let asd = {
                precinct_id: block.precinct_id,
                neighbourhood_id: block.neighbourhood_id,
                block_id: block.id,
                model:model.model,
                model_tag: model.tag,
                scopeValue : parseFloat(scopeValue),
                total: parseFloat(scopeValue) * model.watts * model.hours * electricity
            }
            console.log(asd,  model.watts, model.hours)
            sendToDB(asd)
            //end of residential object
}

        else if(model.tag=== "Buildings")
        {

  //buildings object
  let f1 = (parseFloat(model.model.includes("Residential") ? modelInput1 : scopeValue) * parseFloat(model.electricity) * electricity)
  let f2 = (parseFloat(model.model.includes("Residential") ? modelInput1 : scopeValue) * parseFloat(model.gas) * gas)
  let asd = {
      precinct_id: block.precinct_id,
      neighbourhood_id: block.neighbourhood_id,
      block_id: block.id,
      model:model.model,
      model_tag: model.tag,
      modeInput: model.model.includes("Residential") && parseFloat(modelInput1), //people
      scopeValue : parseFloat(scopeValue), //area
      total_carbon_emissions_electricity : 
                    model.model.includes("Residential") ? parseFloat(modelInput1) * parseFloat(model.electricity) * electricity : 
                    parseFloat(scopeValue) * parseFloat(model.electricity) * electricity,
      lighting :f1 * model.lighting/100,
      lighting_external : f1*model.lighting_external/100,
      appliances : f1*model.appliances/100,
      space_heating : f1*model.space_heating/100,
      cooling : f1*model.cooling/100,
      water_heating: f1*model.water_heating/100,
      pool_pump: f1*model.pool_pump/100,
      cooking: f1*model.cooking/100,
      gas_water_heating: f2*model.gas_water_heating/100,
      gas_cooking: f2*model.gas_cooking/100,
      total_carbon_emissions_gas : parseFloat(model.model.includes("Residential") ? modelInput1 : scopeValue) * parseFloat(model.gas) * gas,     
  }
  console.log(asd)
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
                    variant="outlined" label="Enter number of lights" />
                          </> : <>   
            </>
            }

            {model.tag === "Buildings" ? <>
            {/* scopevalue people*/}
            <TextField autoFocus fullWidth type="number" margin="dense"
                onChange={(e) => handleChange(e.target.value, model)}
                    variant="outlined" label="Enter area" />
                    {/* area modelINput1*/}
               {model.model.includes("Residential") &&  <TextField autoFocus fullWidth type="number" margin="dense"
                onChange={(e) => handleChange(e.target.value, model, 2)}
                    variant="outlined" label="Enter People" />}

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