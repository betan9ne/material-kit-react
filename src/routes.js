import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import UserNewForm from './sections/@dashboard/user/UserNewForm';
import Models from './pages/Models';
import Constants from './pages/Constants';
import Neighborhoods from './pages/Neighborhoods';
import UpdateValues from './pages/UpdateValues';
 

// ----------------------------------------------------------------------

export default function Router() {

  
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'Neighborhoods', element: <Neighborhoods /> },
        { path: 'models', element: <Models /> },
 
        { path: 'constants', element: <Constants /> },
        { path: 'user', element: <UserNewForm /> },        
        { path: 'updateValues', element: <UpdateValues /> }        
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
