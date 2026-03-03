import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Dashboard from './pages/Dashboard';
import AddUser from './pages/Users/AddUser';
import './index.css'
import Users from './pages/Users/users'; 
 
import Homepage from './pages/Home/HomePage';
import Login from './pages/Auth/Login'; 
import Error403 from './pages/Auth/403';  
import UserUpdate from './pages/Users/UserUpdate';
import Role from './pages/Setting/Role';
import RoleUpdate from './pages/Setting/RoleUpdate';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
 
import Home from './pages/HomeWebSite2';
// import AddVehicle from './pages/Vehicle/AddVehicle1';
 
import Vehicles from './pages/Vehicle/Vehicles';
 
import FuelLogsPage from './pages/Vehicle/FuelLogsPage';
import RewardsPage from './pages/Vehicle/RewardsPage';
import VehicleShow from './pages/Vehicle/VehicleShow'; 
import About_vehicle from './pages/Vehicle/About_vehicle';
import AddVehicle from './pages/Vehicle/AddVehicle';
import RewardsTable from './pages/Vehicle/RewardsTable';
import AwardsDisbursed from './pages/Vehicle/AwardsDisbursed';
import FuelSinceLastReward from './pages/Vehicle/FuelSinceLastReward';
import CustomerFuelReward from './pages/Vehicle/CustomerFuelReward';
 
// import EmployeeChart from './pages/Users/EmployeeChart ';
 
  
 

function App() {
  return (
    <div className='border  body w-100   ' style={{width:'100%'   }}>
        <Router>
        <Routes>

        <Route path='/' element={<Homepage/>}> </Route>       
         
        {/* <Route element={<RequirBack/>}>    */}
            <Route path='/login' element={<Login/>}> </Route>            
            
          
        {/* </Route> */}
        {/* <Route path='/auth/google/callback' element={<GOOGLE_CALL_BACK/>}></Route> */}
        <Route path='/*' element={<Error403/>}></Route>      
            <Route   element={<ProtectedRoute permission="dashboard" /> } >  
                <Route path='/dashboard' element={<Dashboard />}>                    
                      <Route path='/dashboard' element={<Home/>}></Route>
                      <Route path='users' element={<Users />}></Route>
                      <Route path='users/:id' element={<UserUpdate />}></Route>
                      <Route path='adduser' element={<AddUser />}></Route> 
                      <Route path='AddVehicle' element={<AddVehicle />}></Route> 
                      <Route path='FuelLogsPage' element={<FuelLogsPage />}></Route> 
                      <Route path='About_vehicle' element={<About_vehicle />}></Route> 
                      <Route path='RewardsTable' element={<RewardsTable />}></Route> 
                      <Route path='AwardsDisbursed' element={<AwardsDisbursed />}></Route> 
                      <Route path='CustomerFuelReward' element={<CustomerFuelReward />}></Route> 
                      <Route path='FuelSinceLastReward' element={<FuelSinceLastReward />}></Route> 
                      <Route path='Vehicles' element={<Vehicles />}></Route> 
                      <Route path='Vehicles/:id' element={<VehicleShow />}></Route> 
                      <Route path='rewards' element={<RewardsPage />}></Route>      
       
      

                
                      
                                
                        {/* <Route   element={<ProtectedRoute permission="الصلاحيات" /> } >   */}
                            <Route path='Role' element={<Role /> }></Route>
                            <Route path='Role/RoleUpdate/:id' element={<RoleUpdate/>}></Route>
                      {/* </Route> */}
                      
            </Route>
            </Route>
       
          
          
        
          {/* <Route path="/employees" element={< EmployeeManagement />} /> */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
