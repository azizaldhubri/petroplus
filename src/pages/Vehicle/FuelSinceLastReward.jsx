import { useState } from "react";
import { Axios } from "../../Api/axios";
import { Card, ListGroup, Button } from "react-bootstrap";

export default function FuelSinceLastReward({ form }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchFuelLogs = async () => {
    setError("");
    setData(null);

    try {
      const res = await Axios.get(
        "/vehicles/fuel-since-last-reward",
        {
          params: {
            plate_number: form.plate_number,
            city_number: form.city_number,
            plate_type: form.plate_type?.value,
          },
        }
      );

      setData(res.data);
    } catch (err) {
      setError("لا توجد تعبئات منذ آخر مكافأة أو المركبة غير موجودة");
    }
  };

  return (
    <>
      <Button
        className="mt-3"
        variant="success"
        onClick={fetchFuelLogs}
      >
        عرض التعبئات منذ آخر مكافأة
      </Button>

      {error && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}

      {data && (
        <Card className="mt-3">
          <Card.Header>
            تعبئات الزبون منذ آخر مكافأة
          </Card.Header>

          <Card.Body>
            <p>👤 الزبون: <strong>{data.vehicle.customer_name}</strong></p>
            <p>
              📅 من تاريخ:{" "}
              <strong>
                {new Date(data.reward_start_date).toLocaleDateString("ar-SA")}
              </strong>
            </p>
            <p className="text-success">
              ⛽ مجموع اللترات: <strong>{data.total_liters}</strong>
            </p>

            <ListGroup>
              {data.logs.length === 0 && (
                <ListGroup.Item className="text-muted">
                  لا توجد تعبئات بعد آخر مكافأة
                </ListGroup.Item>
              )}

              {data.logs.map((log) => (
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
    </>
  );
}
