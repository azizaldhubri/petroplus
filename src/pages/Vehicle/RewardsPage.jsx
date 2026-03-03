import { useState } from "react";
import VehicleList from "../../Component/VehicleList";
import RewardList from "../../Component/RewardList";
import RewardRedemption from "../../Component/RewardRedemption";
// import RewardList from "../../components/RewardList";

export default function RewardsPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
console.log(selectedVehicle)
  return (
    <div className="container mt-3">
      <h3>سجل المكافآت</h3>
      <VehicleList onSelect={setSelectedVehicle} />
      {selectedVehicle && <RewardList vehicle={selectedVehicle} />}

      <h3>صرف الاستحقاقات</h3>
      <VehicleList onSelect={setSelectedVehicle} />
      {selectedVehicle && <RewardRedemption vehicle={selectedVehicle} />}
    </div>
  );
}
