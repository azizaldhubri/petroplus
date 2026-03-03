import { useState } from "react";
import { Form, Col, Card, ListGroup, Button } from "react-bootstrap";
import Select from "react-select";
import { Axios } from "../../Api/axios";
import NavHeader from "../../Component/Dashboard/NavHeader";

export default function CustomerFuelReward() {
  const [form, setForm] = useState({
    plate_number: "",
    city_number: "",
    plate_type: null,
  });

  const [vehicle, setVehicle] = useState(null);
  const [logsData, setLogsData] = useState(null);
  const [error, setError] = useState("");

  const plate_types = [
    { value: "private", label: "خصوصي" },
    { value: "taxi", label: "أجرة" },
    { value: "transport", label: "نقل" },
  ];

  // 🔍 البحث عن المركبة
  const searchVehicle = async () => {
    setError("");
    setVehicle(null);
    setLogsData(null);

    try {
      const res = await Axios.get("vehicles/search", {
        params: {
          plate_number: form.plate_number,
          city_number: form.city_number,
          plate_type: form.plate_type?.value,
        },
      });

      setVehicle(res.data);
    } catch (err) {
      setError("المركبة غير موجودة");
    }
  };

  // ⛽ جلب التعبئات منذ آخر مكافأة
  const fetchFuelLogs = async () => {
    try {
      const res = await Axios.get("/vehicles/fuel-since-last-reward", {
        params: {
          plate_number: form.plate_number,
          city_number: form.city_number,
          plate_type: form.plate_type?.value,
        },
      });

      setLogsData(res.data);
    } catch (err) {
      setError("لا توجد تعبئات منذ آخر مكافأة");
    }
  };

  return (
    <div className="">

      <NavHeader nav={[{ name: "تعبئات الزبائن", link: "#" }]} />
      <div className="w-100 d-flex align-items-center  border border-danger-subtle border-5 flex-wrap">     
        <div className="w-50 border border-black p-5">
                <h2 className="mt-3 text-center">استعلام عن مركبة</h2>

                <div className=" ">

                    {/* رقم اللوحة */}
                    <Form.Group className="mb-2">
                    <Form.Label>رقم اللوحة</Form.Label>
                    <Form.Control
                        type="number"
                        value={form.plate_number}
                        onChange={(e) =>
                        setForm({ ...form, plate_number: e.target.value })
                        }
                    />
                    </Form.Group>

                    {/* رقم المدينة */}
                    <Form.Group className="mb-2">
                    <Form.Label>رقم المدينة</Form.Label>
                    <Form.Control
                        type="number"
                        value={form.city_number}
                        onChange={(e) =>
                        setForm({ ...form, city_number: e.target.value })
                        }
                    />
                    </Form.Group>

                    {/* نوع اللوحة */}
                    <Form.Group className="mb-3">
                    <Form.Label>نوع اللوحة</Form.Label>
                    <Select
                        options={plate_types}
                        value={form.plate_type}
                        onChange={(option) =>
                        setForm({ ...form, plate_type: option })
                        }
                        placeholder="اختر نوع اللوحة"
                    />
                    </Form.Group>

                    {/* زر البحث */}
                    <Button variant="primary" className="w-100" onClick={searchVehicle}>
                    بحث عن المركبة
                    </Button>
                </div>

        </div>
        <div className="w-50 border border-info">
                    {/* رسالة خطأ */}
                    {error && <div className="alert alert-danger mt-3">{error}</div>}

                    {/* بيانات المركبة */}
                    {vehicle && (
                        <Card className="mt-3  ">
                        <Card.Body>
                            <h5>بيانات المركبة</h5>

                            <p>👤 العميل: {vehicle.vehicle.customer_name}</p>
                            <p>🚗 حجم المركبة: {vehicle.vehicle.vehicle_size}</p>
                            <p>⛽ نوع الوقود: {vehicle.vehicle.fuel_type}</p>
                            <p>💰 الرصيد الحالي: {vehicle.current_liters}</p>
                            <p>🎁 المتبقي للحصول على المكافأة: {vehicle.remaining_liters}</p>

                            <Button variant="success" onClick={fetchFuelLogs}>
                            عرض التعبئات منذ آخر مكافأة
                            </Button>
                        </Card.Body>
                        </Card>
                    )}

                    {/* سجل التعبئات */}
                    {logsData && (
                        <Card className="mt-3 w-50">
                        <Card.Body>
                            <h5>تعبئات الوقود منذ آخر مكافأة</h5>

                            <p>
                            📅 من تاريخ:{" "}
                            {new Date(logsData.reward_start_date).toLocaleDateString("ar-SA")}
                            </p>

                            <p className="text-success">
                            ⛽ مجموع اللترات: {logsData.total_liters}
                            </p>

                            <ListGroup>
                            {logsData.logs.length === 0 && (
                                <ListGroup.Item>لا توجد تعبئات</ListGroup.Item>
                            )}

                            {logsData.logs.map((log) => (
                                <ListGroup.Item key={log.id}>
                                {log.liters} لتر  
                                <br />
                                <small className="text-muted">
                                    {new Date(log.filled_at).toLocaleString("ar-SA")}
                                </small>
                                </ListGroup.Item>
                            ))}
                            </ListGroup>
                        </Card.Body>
                        </Card>
                    )}

        </div>

     </div>


    </div>
  );
}
