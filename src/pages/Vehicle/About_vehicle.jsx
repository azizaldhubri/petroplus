 import { useState } from "react";
import { Form , Col } from "react-bootstrap"; 
import Select from 'react-select';
import { Axios } from "../../Api/axios";
import NavHeader from "../../Component/Dashboard/NavHeader";

export default function About_vehicle(){

const [form, setForm] = useState({
  plate_number: "",
  city_number: "",
  plate_type: null,
});

const [vehicle, setVehicle] = useState(null);
const [error, setError] = useState("");

  const  plate_types=[
      {value: 'private', label:'خصوصي'}  ,
      {value: 'taxi', label:'أجرة'}  ,
      {value: 'transport', label:'نقل'}  ,
  ]
 

 const customStyles = {
    container: (provided) => ({
      ...provided,
      fontSize: '22px',
      minWidth: '200px', 
       borderLeft: '7px solid green',  // تخصيص الحدود اليسرى
      borderRight: '7px solid green', // تخصيص الحدود اليمنى
      borderTop: '2px solid gray',             // إزالة الحدود العلوية (اختياري)
      borderBottom: '2px solid gray',          // إزالة الحدود السفلية (اختياري)
      boxShadow: 'none',             // إيقاف تأثير الظل الافتراضي
      '&:hover': {
        borderLeft: '5px solid darkred', // تخصيص الحدود اليسرى عند التمرير
        borderRight: '5px solid darkred', // تخصيص الحدود اليمنى عند التمرير
      }
    }),
    menu: (provided) => ({
      ...provided,      
      fontSize: '19px',
      zIndex: 9999,  // لتحديد قيمة z-index

     
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px', // تحديد الحد الأقصى لارتفاع القائمة
      overflowY: 'auto',  // تفعيل التمرير إذا تجاوزت القائمة الحد الأقصى
    }),
    
     
  };

  const searchVehicle = async () => {
  setError("");
  setVehicle(null);

  try {  
    const res = await Axios.get("vehicles/search", {
      params: {
        plate_number: form.plate_number,
        city_number: form.city_number,
        plate_type: form.plate_type?.value,
      },
    });

    // console.log(res.data)
    setVehicle(res.data);
  
  } catch (err) {
    console.log(err)
    setError("المركبة غير موجودة");
  }
};
   const links=[
        {name:'استعلام عن مركبة',
         link:'#'
        },        
      ]  
    return(
        <div className="w-100 d-flex align-items-center  justify-content-center flex-column"
            style={{}}>
                         <NavHeader nav={links}  /> 
            <h1>ادخل بيانات المركبة</h1>
            <div>
                 <Form.Group   className="d-flex  col-lg-12 col-md-12 col-sm-12  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                    <Form.Label  className="  text-center fs-5"   > رقم اللوحة</Form.Label>
                    <Col lg={12} sm={12} xs={12} md={12} >
                    <Form.Control
                        type="number"
                        placeholder="ادخل رقم اللوحة"
                        value={form.plate_number}
                        onChange={(e) =>
                            setForm({ ...form, plate_number: e.target.value })
                        }                       
                    ></Form.Control>             
                    
                    </Col>
                </Form.Group>  
                 <Form.Group   className="text-center fs-5" >
                    <Form.Label  className="  "   > رقم المدينة   </Form.Label>
                    <Col lg={12} sm={12} xs={12} md={12} >
                    <Form.Control
                       type="number"
                        placeholder="ادخل رقم المدينة"
                        value={form.city_number}
                        onChange={(e) =>
                            setForm({ ...form, city_number: e.target.value })
                        }                        
                    ></Form.Control>          
                    
                    </Col>
                </Form.Group>  
              <div className="fs-5 d-flex flex-column  align-content-center justify-content-center mt-2 "> 
                  <Form.Group   className=" text-center    " >
                    <Form.Label  className="    "   > نوع اللوحة</Form.Label>
                    <Col lg={12} sm={12} xs={12} md={12} >
                        <Select className='w-100   '
                           options={plate_types}
                            value={form.plate_type}
                            onChange={(option) =>
                                setForm({ ...form, plate_type: option })
                            }
                                                         
                            placeholder="خصوصي"
                        styles={customStyles}
                        required
                        >                            
                        </Select> 
                    </Col>
            </Form.Group> 
           
            <button
             type="button"
              className="btn btn-secondary p-1 mt-2 fs-3 ps-5 pe-5"
              onClick={searchVehicle}
            >
              بحث
                </button>
                 
             </div>
            </div>

            {vehicle && (
  <div className="alert alert-success mt-3 w-100">
    <p>اسم العميل: {vehicle.vehicle.customer_name}</p>
    <p>حجم المركبة: {vehicle.vehicle.vehicle_size}</p>
    <p>نوع الوقود: {vehicle.vehicle.fuel_type}</p>
    <p> الرصيد: {vehicle.current_liters}</p>
    <p> الكمية المتبقية للحصول على المكافئة: {vehicle.remaining_liters}</p>
  </div>
)}

{error && (
  <div className="alert alert-danger mt-3 w-100">
    {error}
  </div>
)}
        </div>
    )
}