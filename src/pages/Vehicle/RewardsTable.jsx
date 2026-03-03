import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import NavHeader from "../../Component/Dashboard/NavHeader";
import Swal from "sweetalert2";

export default function RewardsTable() {

  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllRewards = async () => {
    try {
      const response = await Axios.get("rewards/all");
      setRewards(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "حدث خطأ أثناء جلب المكافآت"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRewards();
  }, []);

  if (loading) {
    return <p>جاري التحميل...</p>;
  }

  const redeemReward = async (rewardId) => {

    // ✅ تأكيد قبل الصرف
    const confirm = await Swal.fire({
      title: "تأكيد الصرف",
      text: "هل أنت متأكد من صرف هذه المكافأة؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "نعم، صرف",
      cancelButtonText: "إلغاء",
      reverseButtons: true
    });

    if (!confirm.isConfirmed) return;

    try {
      // ⏳ تحميل
      Swal.fire({
        title: "جاري الصرف...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      await Axios.post(`rewards/${rewardId}/redeem`);

      // ✅ نجاح
      Swal.fire({
        icon: "success",
        title: "تم بنجاح",
        text: "تم صرف المكافأة بنجاح",
        confirmButtonText: "حسناً"
      });

      // تحديث الحالة محليًا
      setRewards(prev =>
        prev.map(r =>
          r.reward_id === rewardId
            ? { ...r, status: "redeemed", redeemed_at: new Date().toISOString() }
            : r
        )
      );

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "فشل العملية",
        text: error.response?.data?.message || "حدث خطأ أثناء صرف المكافأة",
        confirmButtonText: "إغلاق"
      });
    }
  };

  const links = [
    { name: 'جوائز غير مصروفة', link: '#' }
  ];

  return (
    <div>
      <NavHeader nav={links} />

      <table className="table table-bordered table-striped px-3 mt-4">
        <thead>
          <tr>
            <th>اسم العميل</th>
            <th>رقم السيارة</th>
            <th>نوع اللوحة</th>
            <th>الحالة</th>
            <th>تاريخ الاستحقاق</th>
            <th>صرف الاستحقاق</th>
          </tr>
        </thead>

        <tbody>
          {rewards.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                لا توجد مكافآت
              </td>
            </tr>
          ) : (
            rewards.map((row) => (
              <tr key={row.reward_id}>
                <td>{row.customer_name}</td>
                <td>{row.plate}</td>
                <td>
                  {row.plate_type === 'private'
                    ? 'خصوصي'
                    : row.plate_type === 'transport'
                    ? 'نقل'
                    : 'أجرة'}
                </td>
                <td>
                  <span
                    className={
                      row.status === "pending"
                        ? "badge bg-warning"
                        : "badge bg-success"
                    }
                  >
                    {row.status}
                  </span>
                </td>
                <td>{row.earned_at}</td>
                <td>
                  {row.status === "pending" ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => redeemReward(row.reward_id)}
                    >
                      صرف المكافأة
                    </button>
                  ) : (
                    <span className="badge bg-secondary">
                      تم الصرف
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
