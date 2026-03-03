import { useEffect, useState } from "react";
 import { useParams } from "react-router-dom";
import { Axios } from "../../Api/axios";

export default function VehicleShow() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    Axios.get(`vehicles/${id}`)
      .then(res => {
        setVehicle(res.data.vehicle);
      });
  }, [id]);

  if (!vehicle) return <p>جاري التحميل...</p>;

  return (
    <div>
      <h3>بيانات المركبة</h3>

      <p>  اسم العميل: {vehicle.customer_name}</p>
      <p>رقم اللوحة: {vehicle.plate_number}/{vehicle.city_number}</p>
      <p>حجم المركبة: {vehicle.vehicle_size}</p>

      {/* ✅ هنا تضع السطر */}
      {/* <p>رصيد اللترات: {vehicle.liter_balance} لتر</p> */}
    </div>
  );
}
