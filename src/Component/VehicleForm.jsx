import { useState } from "react";
import { Axios } from "../Api/axios";
import Swal from 'sweetalert2';
import LoadingSubmit from "./Loading/Loading";

export default function VehicleForm({ onSuccess }) {
  const [loading ,setLoading]=useState(false)
  const [form, setForm] = useState({
    plate_number: "",
    city_number: "",
    plate_type: "private",
    customer_name: "",
    vehicle_size: "small",
    fuel_type: "petrol",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Axios.post("/vehicles", form);

      // ✅ SweetAlert success
      Swal.fire({
        icon: "success",
        title: "تم بنجاح",
        text: "تم إضافة المركبة بنجاح",
        confirmButtonText: "حسناً"
      });
      setLoading(false);
      onSuccess();

      setForm({
        plate_number: "",
        city_number: "",
        plate_type: "private",
        customer_name: "",
        vehicle_size: "small",
        fuel_type: "petrol",
      });

    } catch (err) {
      // ✅ SweetAlert error
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: err.response?.data?.message || "حدث خطأ غير متوقع",
        confirmButtonText: "إغلاق"
      });
      setLoading(false);
    }
  };

  return (
    <div>
{loading ? 
 <LoadingSubmit />
   :   <form onSubmit={handleSubmit} className="mb-3">
        <input
          name="customer_name"
          placeholder="اسم العميل"
          value={form.customer_name}
          onChange={handleChange}
          className="form-control mb-1"
          required
        />
        <input
          name="plate_number"
          placeholder="رقم السيارة"
          value={form.plate_number}
          onChange={handleChange}
          className="form-control mb-1"
          required
        />
        <input
          name="city_number"
          placeholder="رقم المدينة"
          value={form.city_number}
          onChange={handleChange}
          className="form-control mb-1"
          required
        />
        <select
          name="plate_type"
          value={form.plate_type}
          onChange={handleChange}
          className="form-select mb-1"
        >
          <option value="private">خصوصي</option>
          <option value="taxi">أجرة</option>
          <option value="transport">نقل</option>
        </select>
  
        <select
          name="vehicle_size"
          value={form.vehicle_size}
          onChange={handleChange}
          className="form-select mb-1"
        >
          <option value="small">صغيرة</option>
          <option value="medium">متوسطة</option>
          <option value="large">كبيرة</option>
        </select>
  
        <select
          name="fuel_type"
          value={form.fuel_type}
          onChange={handleChange}
          className="form-select mb-1"
        >
          <option value="petrol">بنزين</option>
          <option value="diesel">ديزل</option>
        </select>
  
        <button className="btn btn-primary">إضافة مركبة</button>
      </form>


}
     
    </div>
    );

}
