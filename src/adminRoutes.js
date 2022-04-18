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
import UserNewForm from './sections/@dashboard/user/UserNewForm';
import Models from './pages/Models';
import Constants from './pages/Constants';
import Neighborhoods from './pages/Neighborhoods';
import UpdateValues from './pages/UpdateValues';
import Projects from './pages/Projects';
 

// ----------------------------------------------------------------------

export default function AdminRoutes() {

  
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <DashboardApp /> },
        { path: 'Projects', element: <Projects /> },
        { path: 'Neighborhoods', element: <Neighborhoods /> },
        { path: 'models', element: <Models /> },
 
        { path: 'constants', element: <Constants /> },
        { path: 'user', element: <User /> },    
        { path: '404', element: <NotFound /> },    
        { path: 'updateValues', element: <UpdateValues /> },
        { path: '*', element: <Navigate to="/404" /> }        
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
