import { useFormik } from 'formik';
import { useState, useEffect} from 'react';

// material

import { Button, Dialog, Container, Typography,  TextField, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
// components
import firebase from '../../firebase'

function AddSite() {
    const [values, setValues] = useState();

    const handleChange = (prop) => (event) => {
        setValues(event.target.value);
      };

//       const calculate  =() =>{
   
//         let electricity = 1.1
//         let gas = 0.2
//         if(model.tag === "Transport")
//                 {
//             //transport object
//             let asd = {
//                 precinct_id: data.precinct_id,
//                 neighbourhood_id: data.neighbourhood_id,
//                 block_id: data.id,
//                 model:model.model,
//                 model_tag: model.tag,
//                 modeInput: modelInput1,
//                 scopeValue : scopeValue,
//                 total: scopeValue * modelInput1 * model.emissions
//             }
//             //end of transport object
//             sendToDB(asd)
//             return
//         }
//         else if(model.tag === "Infrastructure")
//         {
//         //infrastructure object
//         let asd = {
//             precinct_id: data.precinct_id,
//             neighbourhood_id: data.neighbourhood_id,
//             block_id: data.id,
//             model:model.model,
//             model_tag: model.tag,
//             scopeValue : scopeValue,
//             total: scopeValue * model.watts * model.hours
//         }
//         //end of infrastrucure object
//         sendToDB(asd)
//         return
//         }
// else if(model.tag === "Residential Pools")
// {
//             //residential  object
//             let asd = {
//                 precinct_id: data.precinct_id,
//                 neighbourhood_id: data.neighbourhood_id,
//                 block_id: data.id,
//                 model:model.model,
//                 model_tag: model.tag,
//                 scopeValue : scopeValue,
//                 total: scopeValue * model.watts * model.hours *electricity
//             }
//             sendToDB(asd)
//             //end of residential object
// }

//         else if(model.tag=== "Buildings")
//         {
//   //buildings object
//   let f1 = (parseInt(scopeValue) * parseInt(model.electricity) * electricity)
//   let f2 = (parseInt(scopeValue) * parseInt(model.gas) * gas)
//   let asd = {
//       precinct_id: data.precinct_id,
//       neighbourhood_id: data.neighbourhood_id,
//       block_id: data.id,
//       model:model.model,
//       model_tag: model.tag,
//       scopeValue : scopeValue,
//       total_carbon_emissions_electricity : parseInt(scopeValue) * parseInt(model.electricity) * electricity,
//       lighting :f1 * model.lighting,
//       lighting_external : f1*model.lighting_external/100,
//       appliances : f1*model.appliances/100,
//       space_heating : f1*model.space_heating/100,
//       cooling : f1*model.cooling/100,
//       water_heating: f1*model.water_heating/100,
//       pool_pump: f1*model.pool_pump/100,
//       cooking: f1*model.cooking/100,
//       gas_water_heating: f2*model.gas_water_heating/100,
//       gas_cooking: f2*model.gas_cooking/100,
//       total_carbon_emissions_gas : parseInt(scopeValue) * parseInt(model.gas) * gas,     
//   }
  //end of buildings
 // sendToDB(asd)
 // return
 //       }    
    
//    }

    //   const sendToDB = (object) =>{
    //     firebase.firestore().collection("sites").where("block_id","==",data.id).where("model","==",model.model).get().then((doc)=>{
    //         if(doc.docs.length === 1)
    //         {
    //             console.log(doc.docs[0].id)
    //            firebase.firestore().collection("sites").doc(doc.docs[0].id).update(object).then(()=>{
    //             //  setcurrentForm("")
    //            }).catch((e)=>{
    //                alert(e)
    //            })
    //            return
    //         }
    //         else{
    //             firebase.firestore().collection("sites").add(object).then((doc)=>{
    //              //  alert("scope added")
    //            //  setcurrentForm("")
    //             }).catch((e)=>{
    //                 alert(e)
    //             })
    //         }            
    //     }) 
    // }


  return (
    <>
    <DialogTitle>Precinct</DialogTitle>
    <DialogContent>
      <DialogContentText>
       Add a new Precinct to  Neighborhood in the field below.
      </DialogContentText>
      <TextField autoFocus fullWidth type="text" margin="dense"
       onChange={handleChange()}
        variant="outlined" label="Enter name of Precinct here" />
    </DialogContent>
    <DialogActions>
      {/* <Button color="inherit" onClick={()=>data()}>
        Cancel
      </Button>
      <Button variant="contained" onClick={()=>addprecinct()}>
        Save
      </Button> */}
    </DialogActions>
    </>
  )
}

export default AddSite