import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style _TopAndSidBar.css' ;
import {  faBars,  faBell,     faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import  { Menu } from '../Context/MenuContext';
import { UserContext } from '../Context/UserProvider'; 
import { Axios } from '../../Api/axios';
import { LOGOUT } from '../../Api/Api';
import Cookie from 'cookie-universal' ;
import { typeFile } from '../../Helpers/Files';
import '../../Css/Modal.css'; 
import { Link } from 'react-router-dom';
import { WindowSize } from '../Context/WindowContext';
import userImage from './../../Assets/images/user.png' ;
 import nasrImage from '../../img/nasr2.png'
 
export default function Topbar(props){

    const WindowContext=useContext(WindowSize)
    const windowSize=WindowContext.windowSize;       
    const cookie=Cookie();  
    const menu=useContext(Menu)   
    const user=useContext(UserContext)
    const user_data=user.user ;  

    const[notifications,setNotfication]=useState([])
    const[count_notifications,setCountNotfication]=useState(0)
 
    const isUpdated=menu.isupdateNotifaction ;
  
 
//  const imageProfile=`${JSON.parse(user_data.file_paths)}`
 
let imageProfile = null;

if (user_data?.file_paths) {
  try {
    const filePaths = JSON.parse(user_data.file_paths); // تحويل النص إلى مصفوفة
    if (Array.isArray(filePaths) && filePaths.length > 0) {
      // بناء رابط الصورة باستخدام عنوان السيرفر
    //   imageProfile = `http://localhost:8000/${filePaths[0]}`;
      imageProfile = `${filePaths[0]}`;
    }
  } catch (error) {
    console.error("خطأ في JSON.parse:", error);
  }
}
 
    let setisOpen=menu.setisOpen ;
    function handelchangeMenue(){        
        setisOpen((perv)=>!perv) ;  
  } 
  async function handleLogout(){
    try{
        console.log('lllllllllllll')
        // await Axios.get(`/${LOGOUT}`);         
     window.location.pathname='/'
     cookie.remove('vehicle');   
    }
    catch(err){   console.log(err)  }

    }


    // useEffect(()=>{      
    //    getNotification();

    // },[isUpdated])

    async function getNotification(){         
        try{
          await Axios.get(`notifications`)
          .then(res=>{setNotfication(res.data);
            
              // لتحديث عدد الاشعارات 
            if(res.data){
                setCountNotfication(0)
                res.data.map((item)=>
                    setCountNotfication(perv => (item.is_read===0)?(perv+1):(perv) )
                )
                       
            }
         })         
        }
        catch(err){console.log(err)      }
    }

    // ===========================
// async function Notification_isread(id){
//     try{ 
//         await Axios.post(`Notification_isread/${id}`);
//         getNotification();
        
//     }
//     catch(err){console.log(err)}
// }

    const [isModalOpen, setIsModalOpen] = useState(false);

    // دالة لفتح المودال
    // const openModal = () => setIsModalOpen(true);
  
    // دالة لإغلاق المودال
    const closeModal = () => setIsModalOpen(false);
  
    function Modal({ onClose }) {
      return (
          <div className="modal-notification    " 
          onMouseLeave={closeModal}         
              style={{overflowY:'auto',maxHeight:'70vh'}}           
              // style={{overflowY:'scroll',}}          
             >
                 
              {/* <div style={{  }} className='w-100 p-1  mb-2  '>
                  <div className="modal-content1  " 
                  onClick={(e)=>{  e.stopPropagation();}}>
                  <div  className='        gap-3 align-items-start rounded   '   >
                  {notifications && 
                  notifications.map((item,i)=>
                  <div key={i} className='  border-bottom  mt-1  d-flex align-items-center justify-content-center '
                  onClick={()=>Notification_isread(item.id)}

                  style={{
                    background:item.is_read ===0 ? 'rgba(230, 236, 238, 0.8)':'white',
                    height:'70px',
                

                    }}>
               
                      <Link   to={item.link_notification} className='fs-5  m-0  rounded text-dark  ' >{item.message}</Link>
                  </div>
            )

                  }
                  
                
  
                  </div>
                  
                  </div>
              </div> */}
          </div>
      );
  }

    return(
        <div className="top">
            <div className="top-modern-container">
                <div className="top-modern-content">
                    <div className="topbar-left" style={{width: windowSize < 400 ? '100%' : 'auto'}}>
                        {/* <div className="topbar-menu-icon" onClick={handelchangeMenue}>
                            <FontAwesomeIcon icon={faBars} />
                        </div> */}

                        <div className="topbar-actions">
                            <div className="topbar-profile-img-wrapper" style={{ cursor:'pointer'}}>                                        
                                {imageProfile !== null ?                    
                                    <div key={0}>
                                        {typeFile.map((typfile,k)=>
                                            <div key={k}>
                                                {typfile.name.includes(imageProfile.split('.').pop()) && (
                                                    <img 
                                                        src={typfile.type =='img' ? `${typfile.pathimg}/${imageProfile}` : `${typfile.pathimg}`} 
                                                        className="topbar-profile-img"
                                                        alt="profile"
                                                    />
                                                )}
                                            </div>
                                        )} 
                                    </div>
                                    :
                                    <img 
                                        src={userImage} 
                                        className="topbar-profile-img"
                                        alt="profile"
                                    />
                                } 
                            </div>

                            <div className="topbar-icon-button" onClick={() => setIsModalOpen(prev => !prev)}>
                                <FontAwesomeIcon icon={faBell} />
                                {isModalOpen && <Modal onClose={closeModal} />}
                                {count_notifications > 0 && (
                                    <span className="notification-badge">
                                        {count_notifications}
                                    </span>
                                )}
                            </div>

                            <div className="topbar-icon-button" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faSignOut} />
                            </div>
                        </div>
                    </div>

                    {windowSize > 400 && (
                        <img 
                          
                            src={nasrImage} 
                            className="topbar-logo"
                            alt="logo"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}