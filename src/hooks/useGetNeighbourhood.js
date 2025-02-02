import {useState, useEffect} from 'react'
import firebase from '../firebase'

function useGetNeighbourhood() {

    const [docs, setdocs] = useState([])

    useEffect(() => {
         firebase.firestore().collection("neighbourhood").where("user_id", "==", firebase.auth().currentUser.uid).where("status","==", true).onSnapshot((doc)=>{
            const neighbourhood = [];
            doc.docs.forEach(document => {
              const nb = {
                id: document.id,
                ...document.data()
              }
              neighbourhood.push(nb)
            })
            setdocs(neighbourhood)
         })
    }, [])
    return {docs}
}

export default useGetNeighbourhood
