import { useEffect, useState } from "react";
// import api from "../api/api";
import { Axios } from "../Api/axios";

export default function RewardList({ vehicle }) {
  const [rewards, setRewards] = useState([]);

  const fetchRewards = async () => {
    // const res = await api.get(`/vehicles/${vehicle.id}/rewards`);
    const res = await Axios.get(`/vehicles/${vehicle.id}/rewards`);
    setRewards(res.data.rewards);
    console.log(res.data.rewards)
  };

  useEffect(() => { fetchRewards(); }, [vehicle]);

  return (
    <div>
      <h5>سجل المكافآت</h5>
      <ul className="list-group">
        {rewards.map((r) => (
          <li key={r.id} className="list-group-item">
            {r.liters_at_reward} لتر - {r.reward_type} - {new Date(r.rewarded_at).toLocaleString()}
          </li>
        ))}
      </ul>

      <table className="table table-bordered">
  <thead>
    <tr>
      <th>اسم العميل</th>
      <th>السيارة</th>
      <th>نوع اللوحة</th>
      <th>نوع المكافأة</th>
      <th>الحالة</th>
      <th>تاريخ الاستحقاق</th>
      <th>تاريخ الصرف</th>
    </tr>
  </thead>
  <tbody>
    {rewards.map(row => (
      <tr key={row.reward_id}>
        <td>{row.customer_name}</td>
        <td>{row.plate}</td>
        <td>{row.plate_type}</td>
        <td>{row.reward_type}</td>
        <td>
          <span className={
            row.status === 'pending'
              ? 'badge bg-warning'
              : 'badge bg-success'
          }>
            {row.status}
          </span>
        </td>
        <td>{row.earned_at}</td>
        <td>{row.redeemed_at ?? '-'}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
