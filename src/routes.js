import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Projects';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import {useEffect, useState} from 'react'
import Neighborhoods from './pages/pages/Neighborhoods';
import UpdateValues from './pages/UpdateValues';
 import firebase from './firebase'
import Models from './pages/Models';
import Constants from './pages/Constants';
import Projects from './pages/Projects';
import Precincts from './pages/pages/Precincts';
import Blocks from './pages/pages/Blocks';
import UpdateSites from './pages/pages/UpdateSites';

// ----------------------------------------------------------------------

export default function Router() {
const [user, setuser] = useState(null)
  useEffect(() => {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then((doc)=>{
      setuser(doc.data())
      console.log(doc.data())
  })
  }, [])
  
  
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <DashboardApp /> },
        { path: '/Projects', element: <Projects /> },
        { path: '/Neighborhoods', element: <Neighborhoods /> },
        { path: '/Precincts', element: <Precincts /> },
        { path: '/Blocks', element: <Blocks /> },
        { path: '/models', element: user && user.admin ? <Models /> :  <Navigate to="/404" /> },
 
        { path: 'constants', element: user && user.admin ? <Constants/>  :  <Navigate to="/404" /> },
        { path: 'user', element: user && user.admin ?  <User /> :  <Navigate to="/404" /> },    
        { path: '404', element: <NotFound /> },    
        { path: 'updateValues', element: <UpdateSites /> },
        { path: '*', element: <Navigate to="/404" /> }      
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
