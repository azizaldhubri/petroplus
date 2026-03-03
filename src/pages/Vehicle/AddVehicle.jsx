import { useState } from "react";
import VehicleForm from "../../Component/VehicleForm";
 

// import VehicleList from "../../Component/VehicleList";
import NavHeader from "../../Component/Dashboard/NavHeader";

export default function AddVehicle() {
  const [refresh, setRefresh] = useState(false);
 const links=[
        {name:'إضافة عميل',
         link:'#'
        },        
      ]
  return (
    <div className="container"
    style={{}}>
        <NavHeader nav={links}  /> 
      <h3>إدارة المركبات</h3>
      <VehicleForm onSuccess={() => setRefresh(!refresh)} />
      {/* <VehicleList key={refresh} onSelect={() => {}} /> */}
    </div>
  );
}
