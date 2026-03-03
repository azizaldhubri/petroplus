import { useEffect, useState } from "react";
// import api from "../api/api";
import { Axios } from "../Api/axios";

export default function FuelLogList({ vehicle }) {
  const [logs, setLogs] = useState([]);
  
  const fetchLogs = async () => {
    const res = await Axios.get(`/vehicles/${vehicle.id}/fuel-logs`);
    setLogs(res.data);
  };

  useEffect(() => { fetchLogs(); }, [vehicle]);

  return (
    <div>
      <h5>سجل التعبئة</h5>
      <ul className="list-group">
        {logs.map((log) => (
          <li key={log.id} className="list-group-item">
            {log.liters} لتر - {new Date(log.filled_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
