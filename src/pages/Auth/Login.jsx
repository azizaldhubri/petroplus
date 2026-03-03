import { Form , Col } from "react-bootstrap";
import './Auth.css' 
import axios from "axios";
import {   useEffect, useRef, useState } from "react" 
import Cookie from 'cookie-universal' ; 
import { baseUrl, LOGIN } from "../../Api/Api";   
  
export default function Login({ setLoading }){ 
        const [form,setForm]=useState({       
        email:'',
        password: ''
    }) 
     const [rememberMe, setRememberMe] = useState(false);    

    // const[loading,setLoading]=useState(false);
    const[err,setErr]=useState('');  
    const cookie=Cookie();   

     // ref
     const focus=useRef('');      
     useEffect(()=>{     
      focus.current.focus();
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail && savedPassword) {
        setForm({email:savedEmail,
            password:savedPassword
        });
        
        setRememberMe(true);}
     },[]);
    
    function handleChange (e){        
        setForm({...form,[e.target.name]: e.target.value})
        } 

 
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
          if (rememberMe) {
      localStorage.setItem('email', form.email);
      localStorage.setItem('password', form.password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
        
        try{
       const res= await axios.post(`${baseUrl}/${LOGIN}`,form);  
      
          
          const token=res.data.token;
    //    cookie.set('h-resurce',token);

       cookie.set('vehicle',token);  
       window.location.pathname=`/dashboard`;
       setLoading(false);
            }
        catch(err){
            console.log(err)
            setLoading(false);
            if(err.response.status===401){
                setErr('Wrong Email Or password ')
            }else{setErr('Internal Server Error')}
           
        }

    }
    return( 
        <>
        {/* {loading && <LoadingSubmit/> } */}
            <div className="   p-0  text-white col-12 col-lg-10 col-md-10 flex-wrap col-sm-10    
                fs-5   " style={{
                    width: 'auto',
                        // boxShadow: '2px 3px 6px #848c8d',
                background:'#0b1019d1' ,
                // borderRadius:'5px'
                }}>                 

                <div className=" w-100    fs-5 d-flex    align-items-center justify-content-center  flex-wrap">                                     
                <Form.Group   className="d-flex  col-lg-12 col-md-12 col-sm-12  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                        <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   >الايميل:</Form.Label>
                        <Col lg={12} sm={12} xs={12} md={12} >
                        <Form.Control  className="w-100 p-2"                                         
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            type="email" placeholder="Enter Your Email.." 
                            ref={focus}
                            >                        
                        </Form.Control>
                        </Col>
                </Form.Group> 
                <Form.Group   className="d-flex  col-lg-12 col-md-12 col-sm-12  col-12   p-2 flex-wrap align-items-center
                    justify-content-center " >
                
                    <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   > كلمة المرور: </Form.Label>
                <Col lg={12} sm={12} xs={12} md={12} >
                <Form.Control
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        minLength={6}
                        required
                        type="password" placeholder="Enter Your Password.."
                    ></Form.Control>
                </Col>

                </Form.Group>  
                {err && <p className="m-0 text-danger">{err}</p> }                  
                                                    
                        
                
                </div>               
            
                <div className="d-flex gap-3 align-itmes-center justify-content-center flex-wrap    pb-2 ">
                        <button className="text-center rounded btn btn-primary mt-3 " onClick={handleSubmit}
                        style={{background:'rgb(3, 35, 77)' }}>login</button>
                      

                    <label  className=" text-white mt-3 ">
                    <input className="   ms-3 "
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    />
                        تذكرني
                   </label>
                   <br/>

                </div>
            </div>          
        </>             
    
    )
}