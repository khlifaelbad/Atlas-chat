import { NavBar } from "components"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
      <div className="about">
          <NavBar/>
          <div className="about-container">
            <div  
            className="about-content">
              <h1 data-aos="fade-left"
          data-aos-duration="1400"
          data-aos-easing="ease-out"
          data-aos-mirror="true"
          data-aos-once="false" className='about-header'>About Us</h1>
              <p  data-aos="fade-left"
          data-aos-duration="1900"
          data-aos-easing="ease-out"
          data-aos-mirror="true"
          data-aos-once="false"className='about-parag'>A company is the most efficient organization 
              that can drive a sustained change 
              for society. Companies have a duty to build a healthy ecosystem.
               Atlas also goes to great lengths to bring about meaningful changes to society. 
               Such thoughts and efforts shape each of our services.
               And so we make this world a better place than we found it today.</p>
            </div>
            <div data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-easing="ease-out"
          data-aos-mirror="true"
          data-aos-once="false" className='about-hero'>
              <div className="sally"></div>
              </div>
          </div>
      
    </div>
  );
};
