import React from 'react';
import './ScreenshotsSection.css';

const ScreenshotsSection = () => {
  const images = [      
    { src: '/images/1.PNG', alt: 'الواجهة الرئيسية داخل النظام ' },
    { src: '/images/2.PNG', alt: 'تسجيل عميل جديد' },  
      { src: '/images/3.PNG', alt: 'واجهة عرض العملاء ' },
      { src: '/images/4.PNG', alt: 'إدخال كمية جديدة لرصيد العميل' },       
      { src: '/images/6.PNG', alt: 'عرض العملاء الذي وصلوا للمكافأة' },
      { src: '/images/7.PNG', alt: 'عرض العملاء الذين استلمواالمكافأة' },
];

 
 

  return (
    <section className="screenshots-section   mt-4 pt-3 w-100 ">
      <h2>نماذج من النظام</h2>
      <p className="subtitle">استعرض بعض الصور الحقيقية من داخل النظام</p>
      <div className="screenshots-grid">
     
        {images.map((img, i) => (
            <div className="screenshot-card" key={i}>

            <img src={img.src} alt={img.alt} />            
            <p className='m-0'>{img.alt}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScreenshotsSection;
