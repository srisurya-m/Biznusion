import { FaBusinessTime, FaChartLine, FaDatabase, FaHandshake, FaLightbulb, FaBullhorn } from 'react-icons/fa';

const Whatwedo = () => {
  return (
    <div className="whatwedo-main">
      <h2>Our Services</h2>
      <div className="whatwedo-center">
        <div className="content-container">
          <div className="heading">
            <h3>Business Analysis</h3>
          </div>
          <div className="content">
            <FaBusinessTime />
            <p>Our team of experts can analyze your business processes and provide insights to improve efficiency and profitability.</p>
          </div>
        </div>

        <div className="content-container">
          <div className="heading">
            <h3>Data Science</h3>
          </div>
          <div className="content">
            <FaChartLine />
            <p>Utilizing advanced analytics and machine learning, we can extract valuable insights from your data to drive informed decisions.</p>
          </div>
        </div>

        <div className="content-container">
          <div className="heading">
            <h3>Big Data Analysis</h3>
          </div>
          <div className="content">
            <FaDatabase />
            <p>We specialize in handling large datasets to uncover patterns, trends, and opportunities that can benefit your business.</p>
          </div>
        </div>

        <div className="content-container">
          <div className="heading">
            <h3>Consulting</h3>
          </div>
          <div className="content">
            <FaHandshake />
            <p>Our consulting services cover a wide range of business areas, including strategy, operations, technology, and more.</p>
          </div>
        </div>

        <div className="content-container">
          <div className="heading">
            <h3>Solving Business Problems</h3>
          </div>
          <div className="content">
            <FaLightbulb />
            <p>We excel in identifying and solving complex business problems, helping you overcome challenges and achieve your goals.</p>
          </div>
        </div>

        <div className="content-container">
          <div className="heading">
            <h3>Digital Marketing</h3>
          </div>
          <div className="content">
            <FaBullhorn />
            <p>From SEO and social media to content creation and advertising, we can enhance your online presence and drive growth.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whatwedo;
