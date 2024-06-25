import { useEffect, useRef } from "react";
import successImage from "../assets/success.jpg";
import { useLocation } from "react-router-dom";

const Success = () => {
  const contentRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
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
    <div className="success-container" id="success-main">
      <div className="image-container">
        <img src={successImage} alt="Success" className="success-image" />
      </div>
      <div className="content-container" ref={contentRef}>
        <h3>Growth & Success</h3>
        <p>Achieving Excellence Through Continuous Improvement</p>
        <ul>
          <li>
            <strong>Implementation:</strong> Assisting you in executing the
            developed strategies. Our team works closely with you to ensure that
            every aspect of the strategy is implemented effectively and
            efficiently, maximizing the potential for success.
          </li>
          <li>
            <strong>Performance Monitoring:</strong> Tracking progress and
            making necessary adjustments. We continuously monitor the
            performance of the implemented strategies, providing timely updates
            and making data-driven adjustments to keep you on the path to
            success.
          </li>
          <li>
            <strong>Scalability:</strong> Ensuring your business is ready for
            future growth and success. We help you build a scalable framework
            that supports your business growth, preparing you for increased
            demand and expanded market presence.
          </li>
          <li>
            <strong>Continuous Improvement:</strong> Emphasizing the importance
            of ongoing enhancement. We believe in a culture of continuous
            improvement, constantly seeking ways to refine processes, enhance
            performance, and achieve excellence.
          </li>
          <li>
            <strong>Success Stories:</strong> Sharing case studies and
            testimonials to inspire and guide. Learn from the experiences of
            others and understand how our strategies have helped businesses like
            yours achieve remarkable success.
          </li>
          <li>
            <strong>Resource Optimization:</strong> Ensuring optimal use of your
            resources. We focus on efficient resource management, helping you
            get the most out of your investments and achieve superior results
            with minimal waste.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Success;
