import React, { useContext,  } from 'react';
import { Container, Row, Col, Card,  } from 'react-bootstrap';
 
 
import { Link } from 'react-router-dom';
import { WindowSize } from '../Component/Context/WindowContext'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EventNoteIcon from '@mui/icons-material/EventNote';
import './HomeWebSite2.css';
   import nasrImage from '../../src/img/nasr2.png'

const Home = () => {
      const window_Size=useContext(WindowSize);
         const windowsize=window_Size.windowSize ;   
 
  return (
    <div className="home-modern d-flex flex-column">
           
      {/* Welcome Section */}
      <Container className="welcome-section">
        <div className="text-center">
          
                {windowsize > 580 ? (
                        <img                        
                            src={nasrImage} 
                            className="topbar-logo1"
                            alt="logo"
                        />):
                         <h2 className="welcome-title">مجمع النصر </h2>

                    
                  }
          
         
          {/* <p className="welcome-subtitle">ماذا ترغب بالقيام به اليوم؟</p> */}
        </div>
      </Container>

      {/* Info Cards */}
      <Container className="mb-4">
        <Row className=" cards-container g-4 ">
          <Col xs={12} sm={6} md={6} lg={3}>
            <Card className="modern-card card-primary ">
              <Link to='AddVehicle' className="modern-card-link">
                <Card.Body className="modern-card-body">
                  <div className="icon-wrapper">
                    <PersonAddIcon />
                  </div>
                  <Card.Title className="card-title-modern">إضافة عميل</Card.Title>
                  
                </Card.Body>
              </Link>
            </Card>
          </Col>
          
          <Col xs={12} sm={6} md={6} lg={3}>
            <Card className="modern-card">
              <Link to='FuelLogsPage' className="modern-card-link">
                <Card.Body className="modern-card-body">
                  <div className="icon-wrapper">
                    <LocalGasStationIcon />
                  </div>
                  <Card.Title className="card-title-modern">تعبية وقود</Card.Title>
                 
                </Card.Body>
              </Link>
            </Card>
          </Col>
          
          <Col xs={12} sm={6} md={6} lg={3}>
            <Card className="modern-card card-primary">
              <Link to='About_vehicle' className="modern-card-link">
                <Card.Body className="modern-card-body">
                  <div className="icon-wrapper">
                    <AccountBalanceWalletIcon />
                  </div>
                  <Card.Title className="card-title-modern">معرفة الرصيد</Card.Title>
                  
                </Card.Body>
              </Link>
            </Card>
          </Col>
          
          <Col xs={12} sm={6} md={6} lg={3}>
            <Card className="modern-card">
              <Link to='RewardsTable' className="modern-card-link">
                <Card.Body className="modern-card-body">
                  <div className="icon-wrapper">
                    <EventNoteIcon />
                  </div>
                  <Card.Title className="card-title-modern">جوائز غير مصروفة</Card.Title>
              
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
 
       
    </div>
  );
}

export default Home;
