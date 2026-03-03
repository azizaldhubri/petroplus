 import React from 'react'; 
import Topbar from '../Component/Dashboard/Topbar';
import NavigationBar from '../Component/Dashboard/NavigationBar'; 
import { Outlet } from 'react-router-dom';
// import { WindowSize } from '../Component/Context/WindowContext';
 


const Dashboard = () => {
  // const size=useContext(WindowSize);
  // const windowSize=size.windowSize ;
   
  return (
    <div  className="position-relative w-100   " >
              <Topbar/>
              <NavigationBar/>
                <div  className="w-100 dashboard position-relative p-1    "
                 style={{ marginTop:'130px' ,height:'calc(100vh - 130px)' }}>               
                
                <div  className='w-100   border'
                style={{ overflow:'auto',background:'rgba(211, 224, 230, 0.2)'  }} >              
                 <Outlet />                
                </div> 
                
                </div>
                
            </div>


 
  );
};

export default Dashboard;



