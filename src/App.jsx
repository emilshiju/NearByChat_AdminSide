import { Route, Routes } from 'react-router-dom';

import Userslist from './page/usersList';
import AdminLogin from './page/adminLogin';
import Register from "./page/register"
import store from './redux/store';
import UserProtectedRoute from './routes/protectedRoute';
import Report from './page/Report';

import {Provider} from "react-redux"


import AddSubscription from './page/subcription/addSubscriptoin';
import ListSubscription from './page/subcription/listSubscription';
import SubscriptionList from './page/subscriptionList';
import AppView from './page/dashboard/app-view';
import ThemeProvider from './theme';
import EditSubscription from './page/subcription/editSubscription';


const App=()=>{
    return(
        <>
        <ThemeProvider>
        <Provider store={store} >
         <Routes>
         <Route path='/adminLogin' element={<AdminLogin/>} />

         <Route element={<UserProtectedRoute />}>
         <Route path='/' element={<Userslist/>} > </Route>
         {/* <Route path='/register' element={<Register />} /> */}
         <Route path='/report' element={<Report/>} > </Route>
         </Route >
         {/* <Route path='/users' element={<Userslist/>} > </Route> */}
       <Route  path='/addSubscription'  element={<AddSubscription  />}></Route>
       <Route  path='/listSubscription'  element={ <ListSubscription  />}></Route>
       <Route  path='/subscribersList'  element={ <SubscriptionList  />}></Route>
       <Route  path='/listSubscription'  element={ <ListSubscription  />}></Route>
       <Route  path='/subscribersList'  element={ <SubscriptionList  />}></Route>
       <Route  path='/editSubscription/:userId'  element={ <EditSubscription />}></Route>
       <Route  path='/dashboard'  element={ <AppView />}></Route>
       </Routes>
       
       </Provider>
       </ThemeProvider>
        </>
    )
}


export default App