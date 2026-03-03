import { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Dialog, DialogContent } from "@mui/material";

import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
 
import CallToActionSection from "./CallToActionSection";
import Footer from "./Footer";
import Topbar_home from "./Topbar_home";
import Login from "../Auth/Login";
import ScreenshotsSection from "./ScreenshotsSection";
 import Backdrop from "@mui/material/Backdrop";
 import CircularProgress from "@mui/material/CircularProgress";

export default function Homepage() {
  const [loading, setLoading] = useState(false);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  
  const screenshotsSectionRef = useRef(null);

  const [openLogin, setOpenLogin] = useState(false);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: "#0f172a" ,width: '100%'  }}>
      
      {/* 🔥 Navbar حديث */}
      <Topbar_home
        onHeroClick={() => scrollTo(heroRef)}
        onAboutClick={() => scrollTo(aboutRef)}
        onScreenshotsClick={() => scrollTo(screenshotsSectionRef)}
        onLoginClick={() => setOpenLogin(true)}
      />

      {/* 🔥 Hero Section */}
      <section ref={heroRef}>
        <HeroSection onLoginClick={() => setOpenLogin(true)} />
      </section>

      <Container>
        <section ref={aboutRef}>
          <AboutSection />
        </section>

      
        <section ref={screenshotsSectionRef}>
          <ScreenshotsSection />
        </section>

        <CallToActionSection onLoginClick={() => setOpenLogin(true)} />
      </Container>

      <Footer />

    
      {/* // عرض loading عند التأكد من كامة المرور والايميل  */}
       <Backdrop
         sx={{ color: "#fff", zIndex: 2000 }}
          open={loading}
         >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        // maxWidth="xs"
        fullWidth
         
         PaperProps={{
    sx: {
      border:'5px solid #0f559b',
      borderRadius: 4,
      // backgroundColor: "#111827",
      color: "white",
      padding: 0 ,
      margin:0

    }
  }}
       
      >
        <DialogContent          
         sx={{ padding: 0 }} 
        >
          <Login setLoading={setLoading} />
        </DialogContent>
      </Dialog>
    </div>
  );
}