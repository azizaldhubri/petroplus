import { useEffect, useState } from "react";
import { Axios } from "../Api/axios";
 

export default function RewardRedemption({ vehicle }) {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(false);

  // جلب المكافآت
  const fetchRewards = async () => {
    if (!vehicle) return;
     try {
    const res = await Axios.get(`/vehicles/${vehicle.id}/rewards`);
    // تأكد أن البيانات مصفوفة
    setRewards(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error(err);
    alert("حدث خطأ أثناء جلب المكافآت");
  }
  };

  useEffect(() => {
    fetchRewards();
  }, [vehicle]);

  // صرف المكافأة
  const redeemReward = async (rewardId) => {
    if (!window.confirm("هل تريد صرف تغيير الزيت لهذه المكافأة؟")) return;
    setLoading(true);
    try {
      await Axios.post(`/rewards/${rewardId}/redeem`);
      alert("تم صرف تغيير الزيت بنجاح ✅");
      fetchRewards(); // تحديث القائمة
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء صرف المكافأة");
    }
    setLoading(false);
  };

  if (!vehicle) return <p>اختر مركبة لعرض الاستحقاقات</p>;

  return (
    <div className="mt-3">
      <h5>استحقاقات المكافآت لـ {vehicle.plate_number}</h5>
      {rewards.length === 0 && <p>لا توجد مكافآت حتى الآن</p>}
      <ul className="list-group">
        {rewards.map((reward) => (
          <li
            key={reward.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              reward.status === "redeemed" ? "list-group-item-success" : ""
            }`}
          >
            <div>
              {reward.reward_type === "oil_change" && "تغيير زيت"} -{" "}
              {reward.liters_at_reward} لتر
              <br />
              <small>استحقاق: {new Date(reward.earned_at).toLocaleDateString()}</small>
              {reward.status === "redeemed" && (
                <small> | تم الصرف: {new Date(reward.redeemed_at).toLocaleDateString()}</small>
              )}
            </div>
            {reward.status === "pending" && (
              <button
                className="btn btn-warning btn-sm"
                onClick={() => redeemReward(reward.id)}
                disabled={loading}
              >
                صرف المكافأة
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
