// routes
import Router from './routes';
import AdminRoutes from './adminRoutes';
import LoginRoutes from './loginroutes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import React, {useState, useEffect} from 'react'
import firebase from './firebase'
// ----------------------------------------------------------------------

export default function App() {

  const [state, setstate] = useState(false)  
 

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){      
   
       setstate(true)  
      
      }
      else{
        setstate(false)
      }
      
        })
  }, [state])
  console.log(state)
  
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      {state && <Router />}
      {!state && <LoginRoutes />}
    </ThemeConfig>
  );
}
