import React, { createContext, useEffect, useState } from "react"; 
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/Api";
 
// import Cookie from 'cookie-universal' ;
 
 
// إنشاء السياق
export const UserContext = createContext();
  
export const UserProvider = ({ children }) => {
  // const cookie=Cookie();
   
  // const token=cookie.get('vehicle');
 
  const [user, setUser] = useState([]);
  const [permissions, setPermissions] = useState([]);   
  const [update, setUpdate] = useState(true);   
 

  async function User_role( ) {    
        await  Axios.get(`${USER}` )            
        .then(data=>{
           
          setUser(data.data);
          fetchPermissions(data.data.role_id);
        

      }) 
      // .catch(()=>navegate('/login',{replace:true}) ) 
     .catch((error) => {
  console.log(error.response?.status);
  console.log(error.response?.data);
}); 
  }
  useEffect(()=>{ 
      User_role()              
// },[ ])
},[ ])

 

async function fetchPermissions(id) {
    await Axios.get(`roles/${id}`)
  .then(data=>{setPermissions(data.data);     
  })  
 
};
 

  return (
    <UserContext.Provider value={{ user, setUser,permissions, setPermissions ,update, setUpdate}}>
      {children}
    </UserContext.Provider>
  );
};
