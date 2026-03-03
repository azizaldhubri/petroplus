import { useEffect, useState } from "react";
// import api from "../api/api";
import { Axios } from "../Api/axios";

export default function RewardSummary({ vehicle }) {
  const [summary, setSummary] = useState(null);

  const fetchSummary = async () => {
    const res = await Axios.get(`/vehicles/${vehicle.id}/reward-summary`);    
    setSummary(res.data);
  };

  useEffect(() => { fetchSummary(); }, [vehicle]);

  if (!summary) return null;

  return (
    <div className="my-3 p-2 border">
      <h5>ملخص المكافأة</h5>
      <p>المركبة: {vehicle.plate_number}</p>
      <p>الكمية الحالية: {summary.current_liters} / {summary.limit} لتر</p>
      <p>النسبة المئوية: {summary.progress_percent}%</p>
    </div>
  );
}
