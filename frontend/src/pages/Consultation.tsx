import { useEffect, useRef } from 'react';
import consultationImage from '../assets/consultation.png';
import { useLocation } from 'react-router-dom';

const Consultation = () => {
  const location = useLocation();
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="consultation-container" id='consultation-main'>
      <div className="image-container">
        <img src={consultationImage} alt="Consultation" className="consultation-image" />
      </div>
      <div className="content-container" ref={contentRef}>
        <h3>Consultation</h3>
        <p>Tailored Guidance for Your Unique Needs</p>
        <ul>
          <li>
            <strong>Initial Assessment:</strong> Understanding your business needs and objectives. 
            Our team conducts a comprehensive evaluation to identify key challenges and opportunities.
          </li>
          <li>
            <strong>Strategy Development:</strong> Crafting a customized plan to address your challenges. 
            We design strategic roadmaps that align with your goals and ensure sustainable growth.
          </li>
          <li>
            <strong>Ongoing Support:</strong> Continuous guidance and support to ensure you stay on track. 
            Our experts provide regular check-ins, updates, and adjustments to keep your projects on course.
          </li>
          <li>
            <strong>Implementation Assistance:</strong> Helping you implement the recommended strategies effectively. 
            We work closely with your team to ensure seamless execution and optimal results.
          </li>
          <li>
            <strong>Performance Monitoring:</strong> Regularly tracking progress and performance metrics. 
            We provide detailed reports and insights to help you make informed decisions and drive continuous improvement.
          </li>
          <li>
            <strong>Technology Integration:</strong> Integrating the latest technologies to enhance your business operations. 
            Our solutions are designed to improve efficiency, productivity, and competitiveness in the market.
          </li>
          <li>
            <strong>Expert Training:</strong> Offering training sessions for your team to adapt to new technologies and methodologies. 
            This ensures that your team is well-equipped to handle the updated systems and processes.
          </li>
          <li>
            <strong>Scalable Solutions:</strong> Providing scalable solutions that grow with your business. 
            We ensure that the strategies and technologies implemented can be scaled up as your business expands.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Consultation;
