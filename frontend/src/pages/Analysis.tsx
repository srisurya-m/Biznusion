import { useEffect, useRef } from 'react';
import analysisImage from '../assets/analysis.jpg'; 
import { useLocation } from 'react-router-dom';

const Analysis = () => {
  const contentRef = useRef(null);
  const location = useLocation();

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
    <div className="analysis-container" id='analysis-main'>
      <div className="image-container">
        <img src={analysisImage} alt="Analysis" className="analysis-image" />
      </div>
      <div className="content-container" ref={contentRef}>
        <h3>Analysis</h3>
        <p>In-Depth Insights for Data-Driven Decisions</p>
        <ul>
          <li>
            <strong>Data Collection:</strong> Gathering relevant data from various sources. 
            Our team employs a range of methods to ensure comprehensive data collection, 
            capturing both quantitative and qualitative information essential for your business.
          </li>
          <li>
            <strong>Detailed Analysis:</strong> Using advanced tools to derive actionable insights. 
            We leverage cutting-edge analytics tools and methodologies to uncover patterns, 
            trends, and correlations that inform strategic decisions.
          </li>
          <li>
            <strong>Reporting:</strong> Providing clear and concise reports to aid decision-making. 
            Our reports are designed to be easily digestible, highlighting key findings and 
            recommendations to guide your business strategies effectively.
          </li>
          <li>
            <strong>Predictive Modeling:</strong> Utilizing statistical models to predict future trends. 
            We help you anticipate changes and prepare proactive strategies to stay ahead in the market.
          </li>
          <li>
            <strong>Performance Metrics:</strong> Identifying key performance indicators (KPIs) that matter. 
            We help you focus on the metrics that truly impact your business, providing clarity and direction.
          </li>
          <li>
            <strong>Data Visualization:</strong> Creating intuitive visualizations to represent data insights. 
            Our visual tools make complex data more understandable, facilitating better communication and decision-making.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Analysis;
