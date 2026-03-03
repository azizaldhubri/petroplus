 import { Form , Col } from "react-bootstrap"; 
import Select from 'react-select'; 
import { useContext, useEffect, useRef, useState } from "react"; 
import 'moment/locale/ar';
import { Link, useNavigate } from "react-router-dom"; 
import { typeFile } from "../../Helpers/Files";
import { Axios } from "../../Api/axios";
import { USERS } from "../../Api/Api";
import { Menu } from "../../Component/Context/MenuContext";
 
 

export default function AddUser(){  
  const menu=useContext(Menu)    
  let setIsupdated=menu.setIsupdateNotifaction ;
  const navigate=useNavigate('')
  const[filesdata,setFilesdata]=useState([]); 
  const[confirmPassword,setConfirmPassword]=useState('');
  const[message,setMessage]=useState('');  
  const[roles,setRole]=useState([]);
  const[form,setForm]=useState({
    name:'',  
    email:'',    
    phone_number:'',       
    role:'user',       
    role_id:'2',   
    password:'',         
});

  useEffect(()=>{
     getRoles();    
  },[]) 

  
 //////////////////////////////   getRoles---------
  async function getRoles(){
    try{ await Axios.get('roles')
      .then(res =>setRole(res.data))
     }
    catch(err){
      console.log(err)
    }
  }
  const OptionRoles =roles && roles.map(item => ({
    value: item.id,
    label: item.name
  }));
//----------------


  function handleChange (e){      
    setForm({...form,[e.target.name]:e.target.value})
    }
 
  const openImage=useRef(null);
 
 
 
 
  
  

function handlechangefile(e){  
  setFilesdata( [...e.target.files]); 
}

// function HandleCansleFiles(id){
//   setFilesdata((prev)=>prev.filter(img=>img !==id)) ;            
// }

function handleOpenImage(){
  openImage.current.click()      
}

async function handleSubmit(e){
  e.preventDefault();
 
  const formData = new FormData();     
    formData.append('name', form.name);  
    formData.append('email', form.email); 
    formData.append('password', form.password);
    formData.append('phone_number', form.phone_number); ; 
    
    formData.append('role', form.role.label );
    formData.append('role_id', form.role.value );   
 
  
    formData.append('admin', '1'); // اضافة تنبية  للمدير بوجود موظف جديد   
    formData.append('files[]', filesdata[0])
    try{                       
      console.log(...formData)   
       await Axios.post(`${USERS}/add`,formData )  ; 
       navigate('/dashboard/users')  ;       
    }
    catch(err){       
      // console.log(err);
      console.log(err.response.data.message);
      setMessage(err.response.data.message)
    }
}

function handelUpateNotifaction(){        
  setIsupdated((perv)=>!perv) ;  
}
 
 
    return(
        <div className="w-100        col-12 col-lg-12 col-md-12 col-sm-12   "
        style={{}}>

                <div className="w-25 d-flex justify-content-between fs-4 p-2   "
                style={{marginRight:'8%'}}> 
                <Link to='/dashboard'>رجوع</Link>
                 <Link to='/dashboard/users'className="link m-0  ">عرض كل الموظفين</Link>                
              </div>
            <div className="w-100 d-flex  col-12 col-lg-12 col-md-12 col-sm-12   flex-column border-0 border-top    ">

                <div className="  mt-3  w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   >الاسم</Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                              <Form.Control  className="p-2"                                         
                                  type="text" 
                                  name="name"
                                  value={form.name}
                                  onChange={handleChange}
                                  >                        
                              </Form.Control>
                            </Col>
                    </Form.Group>                   
                                     
          
 
                </div>
                <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center"
                    >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > البريد الالكتروني</Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                              <Form.Control  className="p-2"                                         
                                  type="email" 
                                  name="email"
                                  value={form.email}
                                  onChange={handleChange}>                        
                              </Form.Control>
                            </Col>
                            {message.includes('The email has already been taken.')&&
                            <p className="text-danger m-0" style={{fontSize:'13px'}}>الايميل هذا مسجل من قبل</p>                            
                            }
                    </Form.Group>                   
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   >رقم الهاتف</Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                              <Form.Control  className="p-2"                                          
                                  type="number"
                                  name="phone_number"
                                  value={form.phone_number}
                                  onChange={handleChange}>                        
                              </Form.Control>
                            </Col>
                    </Form.Group>                   
                  
 
                </div>
               
                <div className="    w-100    fs-5 col-12 col-lg-12  gap-3 col-md-12 col-sm-12 d-flex   gap-lg-4 align-items-center justify-content-center  flex-wrap  ">                                     
                                       
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center  " >
                            <Form.Label  className="  col-6 col-lg-3   col-sm-4 m-0 col-md-8 "   > صلاحية المستخدم </Form.Label>
                            <Col lg={9} sm={8} xs={6} md={9} >
                              <Select className='w-100   '
                                name='role'
                                onChange={(e)=> setForm({...form,role:e })}             
                                  options={OptionRoles}                                                           
                                  placeholder="user"
                                // styles={customStyles}
                                required
                              >                            
                              </Select> 
                            </Col>
                    </Form.Group> 
                  
 
                </div>
                <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                                       
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8 "   > كلمة المرور </Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                            <Form.Control
                            type="password"
                            name="password"
                              placeholder="At least 6 charecter"
                            value={form.password}
                            onChange={handleChange}                            
                            ></Form.Control>
                            {message.includes('The password field is required.')&&
                            <p className="text-danger m-0" style={{fontSize:'13px'}}>يرجى ادخال كلمة مرور من 6 ارقام فاكثر</p>                            
                            }
                           
                            </Col>
                    </Form.Group>                    
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" 
                    >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8 "   >تأكيد كلمة المرور </Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} 
                              style={{
                                borderBottom:confirmPassword.length===0 ?'':
                                (form.password===confirmPassword && confirmPassword.length >=6) ?'4px solid green': '4px solid red'
                              }} >
                            <Form.Control
                            type="password"
                            name="confirmPassword"
                             value={confirmPassword}
                             placeholder="At least 6 charecter"
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                                                     
                            ></Form.Control>
                  
                            </Col>
                    </Form.Group>                    
 
                </div>
                <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center flex-column gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                                             
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12    flex-wrap align-items-center justify-content-center" >
                            
                            <Col lg={9} sm={8} xs={12} md={12} >
                            <Form.Control 
                            type="file"
                            hidden
                          //  event.target.files[0].
                          
                          // onChange={(event)=>setFilesdata( URL.createObjectURL(event.target.files[0]))}
                          onChange={handlechangefile}
                          
                            ref={openImage}
                            ></Form.Control>
                                      
                            </Col>
                  </Form.Group>  
                  <p className="m-0 fs-5"> اختر الصورة الشخصية</p>
                  <div className="border bg-light p-3 mb-4"
                    onClick={handleOpenImage}
                    
                  style={{width:'200px',height:'200px',cursor:'pointer'}}>
                   {filesdata[0] && 
                    // <img src={filesdata}style={{width:'100%',height:'180px'}} ></img>     

                     <div   className="  position-relative mt-2   ">                                                                
                    {  typeFile.map((typfile,ki)=>
                      <div key={ki}>
                           {typfile.src_type===filesdata[0].type&&(
                           <div className="d-flex align-items-center justify-content-start flex-column ">
                                 <img  src={typfile.type ==='img'? `${URL.createObjectURL(filesdata[0])}`:` ${typfile.pathimg}`} 
                                style={{width:'100%',height:'180px'}} alt="" ></img>
                          
                            </div>
                             )}
                       </div>)}
                       </div>

                       } 

                              
                       </div>
                 </div>

              <div className="w-100 border text-center gap-4">
                <button className="btn btn-primary m-3" onClick={handleSubmit}>حفظ</button>
                <button className="btn btn-primary">إلغاء</button>
              </div>
                 
           

            </div>
        </div>
    )
}