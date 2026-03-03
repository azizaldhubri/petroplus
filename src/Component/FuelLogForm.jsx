import { useState } from "react";
import { Axios } from "../Api/axios";
import Swal from "sweetalert2";

export default function FuelLogForm({ vehicle, onSuccess }) {
  const [liters, setLiters] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ تأكيد قبل الحفظ
    const result = await Swal.fire({
      title: "تأكيد العملية",
      text: `هل أنت متأكد من تسجيل تعبئة ${liters} لتر؟`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "نعم، سجل",
      cancelButtonText: "إلغاء",
      reverseButtons: true
    });

    // ❌ في حال الإلغاء
    if (!result.isConfirmed) return;

    try {
      // ⏳ تنبيه تحميل
      Swal.fire({
        title: "جاري الحفظ...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      await Axios.post("/fuel-logs", {
        vehicle_id: vehicle.id,
        liters
      });

      // ✅ نجاح
      Swal.fire({
        icon: "success",
        title: "تم بنجاح",
        text: "تم تسجيل التعبئة بنجاح",
        confirmButtonText: "حسناً"
      });

      setLiters("");
      onSuccess();

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: err.response?.data?.message || "حدث خطأ أثناء تسجيل التعبئة",
        confirmButtonText: "إغلاق"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>تسجيل تعبئة لـ: {vehicle.plate_number}</h5>

      <input
        type="number"
        placeholder="الكمية باللتر"
        value={liters}
        onChange={(e) => setLiters(e.target.value)}
        className="form-control mb-2"
        required
        min="1"
      />

      <button className="btn btn-success">
        تسجيل التعبئة
      </button>
    </form>
  );
}
