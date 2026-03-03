import { useEffect, useState } from "react";
// import api from "../api/api";
import Select from "react-select"
import { Axios } from "../Api/axios";

export default function VehicleList({ onSelect }) {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    const res = await Axios.get("/vehicles");
    setVehicles(res.data);
  };

  useEffect(() => { fetchVehicles(); }, []);
 const customStyles = {
    container: (provided) => ({
      ...provided,
      fontSize: '22px',
      minWidth: '200px', 
       borderLeft: '7px solid green',  // تخصيص الحدود اليسرى
      borderRight: '7px solid green', // تخصيص الحدود اليمنى
      borderTop: '2px solid gray',             // إزالة الحدود العلوية (اختياري)
      borderBottom: '2px solid gray',          // إزالة الحدود السفلية (اختياري)
      boxShadow: 'none',             // إيقاف تأثير الظل الافتراضي
      '&:hover': {
        borderLeft: '5px solid darkred', // تخصيص الحدود اليسرى عند التمرير
        borderRight: '5px solid darkred', // تخصيص الحدود اليمنى عند التمرير
      }
    }),
    menu: (provided) => ({
      ...provided,      
      fontSize: '19px',
      zIndex: 9999,  // لتحديد قيمة z-index

     
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px', // تحديد الحد الأقصى لارتفاع القائمة
      overflowY: 'auto',  // تفعيل التمرير إذا تجاوزت القائمة الحد الأقصى
    }),
    
     
  };
   const vehicleOptions = vehicles.map(v => ({
    value: v.id,
    label: `${v.plate_number} - ${v.city_number} (${v.plate_type})`,
    vehicle: v, // نخزن المركبة كاملة
  }));

  return (
    <div>
      <h5>قائمة المركبات</h5>
      {/* <ul className="list-group">
        {vehicles.map((v) => (
          <li key={v.id} className="list-group-item d-flex justify-content-between align-items-center" onClick={() => onSelect(v)}>
            {v.plate_number} - {v.city_number} ({v.plate_type})
          </li>
        ))}
      </ul> */}
      <Select
  className="w-100"
  options={vehicleOptions}
  placeholder="اختر المركبة"
  onChange={(option) => {
    onSelect(option.vehicle); // نفس سلوك li السابق
  }}
  styles={customStyles}
/>
    </div>
  );
}
