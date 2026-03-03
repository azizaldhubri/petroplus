import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import NavHeader from "../../Component/Dashboard/NavHeader";

export default function AwardsDisbursed(){
      const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const getAllRewards = async () => {
      try {
        const response = await Axios.get("AwardsDisbursed");
        setRewards(response.data);
      } catch (error) {
        console.error("خطأ في جلب المكافآت", error);
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
    try {
      console.log(rewardId)
   const res=  await Axios.post(`rewards/${rewardId}/redeem`);
   console.log(res)
      // تحديث الحالة محليًا بدون إعادة تحميل
      setRewards(prev =>
        prev.map(r =>
          r.reward_id === rewardId
            ? { ...r, status: "redeemed", redeemed_at: new Date().toISOString() }
            : r
        )
      );
    } catch (error) {
      console.error("فشل صرف المكافأة", error);
      alert("حدث خطأ أثناء صرف المكافأة");
    }
  };
    const links=[
         {name:'الجوائز المصروفة',
          link:'#'
         },        
       ]
       return (
         <div>
        <NavHeader nav={links}  />
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>اسم العميل</th>
              <th>رقم السيارة</th>
              <th>نوع اللوحة</th>
              {/* <th>نوع المكافأة</th> */}
              <th>الحالة</th>
              <th>تاريخ الاستحقاق</th>
              <th>تاريخ الصرف</th>
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
                  <td>{row.plate_type==='private' ? 'خصوصي'
                  :row.plate_type==='transport' ? 'نقل'
                  : 'أجرة'
                  }</td>
                  {/* <td>{row.plate_type}</td> */}
                  {/* <td>{row.reward_type}</td> */}
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
                  <td>{row.redeemed_at ?? "-"}</td>
    
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
