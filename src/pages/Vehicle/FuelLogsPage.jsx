import { useState } from "react";
 
import RewardSummary from "../../Component/RewardSummary";
import FuelLogForm from "../../Component/FuelLogForm";
// import FuelLogList from "../../Component/FuelLogList";
import VehicleList from "../../Component/VehicleList";
import NavHeader from "../../Component/Dashboard/NavHeader";
 

export default function FuelLogsPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const links=[
         {name:'تعبئة بنزين',
          link:'#'
         },        
       ]
       
  return (
    <div className="container  "style={{height:'100vh'}}>
        <NavHeader nav={links}  /> 
      <h3>تسجيل التعبئة</h3>
      <VehicleList onSelect={setSelectedVehicle} />
      {selectedVehicle && (
        <>
          <RewardSummary vehicle={selectedVehicle} />
          <FuelLogForm vehicle={selectedVehicle} onSuccess={() => {}} />
          {/* <FuelLogList vehicle={selectedVehicle} /> */}
        </>
      )}
    </div>
  );
}
