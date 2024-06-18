import { useEffect } from 'react';
import { FaBusinessTime, FaChartLine, FaDatabase, FaHandshake, FaLightbulb, FaBullhorn } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Whatwedo = () => {
  const location = useLocation();

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
    <div className="whatwedo-main">
      <h2>Our Services</h2>
      <div className="whatwedo-center">
        <div id="business-analysis" className="content-container">
          <div className="heading">
            <h3>Business Analysis</h3>
          </div>
          <div className="content">
            <p>
              Our team of experts can analyze your business processes and provide insights to improve efficiency and profitability. We conduct thorough assessments of your operational procedures, identifying bottlenecks and areas for improvement. With data-driven methodologies, we deliver actionable recommendations to optimize workflows, reduce costs, and enhance overall business performance. Business analysis involves understanding your business environment, aligning strategies with business objectives, and ensuring that the solutions provided are both feasible and sustainable.
            </p>
            <FaBusinessTime className="icon" />
          </div>
        </div>

        <div id="data-science" className="content-container">
          <div className="heading">
            <h3>Data Science</h3>
          </div>
          <div className="content">
            <p>
              Utilizing advanced analytics and machine learning, we can extract valuable insights from your data to drive informed decisions. Our data scientists apply statistical techniques and predictive modeling to uncover hidden patterns and trends within your datasets. This enables you to make data-driven decisions that enhance business strategies, customer experiences, and operational efficiencies. Our data science services also include data cleaning, data visualization, and creating machine learning models to predict future trends and behaviors, providing you with a competitive edge.
            </p>
            <FaChartLine className="icon" />
          </div>
        </div>

        <div id="big-data-analysis" className="content-container">
          <div className="heading">
            <h3>Big Data Analysis</h3>
          </div>
          <div className="content">
            <p>
              We specialize in handling large datasets to uncover patterns, trends, and opportunities that can benefit your business. Our big data solutions involve the collection, storage, and analysis of vast amounts of data from various sources. By leveraging cutting-edge technologies and analytical tools, we help you gain a competitive edge through comprehensive insights and strategic intelligence. Big data analysis can improve decision-making processes, personalize customer experiences, and identify new business opportunities, all while managing the volume, velocity, and variety of your data.
            </p>
            <FaDatabase className="icon" />
          </div>
        </div>

        <div id="consulting" className="content-container">
          <div className="heading">
            <h3>Consulting</h3>
          </div>
          <div className="content">
            <p>
              Our consulting services cover a wide range of business areas, including strategy, operations, technology, and more. We work closely with your team to understand your unique challenges and objectives. Our consultants provide expert advice, tailored solutions, and implementation support to help you achieve your business goals, improve performance, and drive growth. Consulting involves not just providing advice but also ensuring that the solutions are implemented effectively and efficiently. Our approach is collaborative, working with you to achieve sustainable success.
            </p>
            <FaHandshake className="icon" />
          </div>
        </div>

        <div id="solving-business-problems" className="content-container">
          <div className="heading">
            <h3>Solving Business Problems</h3>
          </div>
          <div className="content">
            <p>
              We excel in identifying and solving complex business problems, helping you overcome challenges and achieve your goals. Our approach involves a deep understanding of your business environment, critical thinking, and innovative solutions. Whether you face operational inefficiencies, market challenges, or strategic dilemmas, our team provides the expertise and tools needed to address and resolve them effectively. Problem-solving involves root cause analysis, brainstorming potential solutions, and implementing the most viable option while continuously monitoring its effectiveness.
            </p>
            <FaLightbulb className="icon" />
          </div>
        </div>

        <div id="digital-marketing" className="content-container">
          <div className="heading">
            <h3>Digital Marketing</h3>
          </div>
          <div className="content">
            <p>
              From SEO and social media to content creation and advertising, we can enhance your online presence and drive growth. Our digital marketing strategies are designed to reach your target audience effectively and efficiently. We utilize data-driven approaches to optimize your marketing campaigns, ensuring maximum ROI. Digital marketing includes search engine optimization (SEO), pay-per-click (PPC) advertising, social media management, email marketing, and content marketing. Our goal is to increase your brand awareness, engage your customers, and boost your online conversions.
            </p>
            <FaBullhorn className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whatwedo;
