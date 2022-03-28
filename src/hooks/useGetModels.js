import {useState, useEffect} from 'react'
import firebase from '../firebase'


const useGetModels = (id) => {
    const [docs, setdocs] = useState([])

    useEffect(() => {
         firebase.firestore().collection("models").onSnapshot((doc)=>{
            const models = [];
            doc.docs.forEach(document => {
              const nb = {
                id: document.id,
                ...document.data()
              }
              models.push(nb)
            })
            setdocs(models)
         })
    }, [])
    return {docs}
}

export default useGetModels
