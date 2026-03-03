import { Axios } from "../../Api/axios";
// import api from "../api";
import { useEffect, useState } from "react";
import Table_documents from "../../Component/Dashboard/Table_document";
import NavHeader from "../../Component/Dashboard/NavHeader";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
     
    const[limit,setLimit]=useState(3)
    const[page,setPage]=useState(1)
    // const[loading,setLoading]=useState(false)
    const[total,setTotal]=useState(0);

  useEffect(() => {
      async  function Getvehicles(){
    try{
    await  Axios.get("vehicles").then(res => {    
      setVehicles(res.data)});

    }
    catch(err){console.log(err)}
  }
      Getvehicles();

  }, []);

    const header=[
          
        {
            key:'customer_name',
            name:'الاسم'
        },
      
        {
            key:'city_number',
            name:'الفاصل'
        },
     
      
        {
            key:'plate_number',
            name:'رقم اللوحة'
        },
       
    
        {
            key:'vehicle_size',
            name:'النوع'
        },
        {
            key:'action',
            name:'العمليات'
        },
     ]

  // return vehicles.map(v => (
  //   <div key={v.id}>
  //     🚗 {v.plate_number} | 🛢️ {v.city_number} | 🎁 {v.reward_count}| 🛢️ {v.customer_name} | 🎁 {v.vehicle_size}
  //     🚗 {v.fuel_type} | 🛢️ {v.plate_type}    
  //   </div>    
  // ));
   const links=[
         {name:'العملاء',
          link:'#'
         },        
       ]
       return(
         <div className="mt-0    "style={{ }}>                      
         <NavHeader nav={links}  />
      <Table_documents
            limit={limit}
      setLimit={setLimit}
      page={page}
        header={header}
        data={vehicles}
      // currentUser={currentUser}
        // delete ={handleDelet}
        setPage={setPage}
        loading='loading'
        edit='vehicles'
        total={total}
        search='name'
      //   Linksearch={USER}
      //   createTask={createTask}
            role='admin'
        />

          </div>
  )
}
