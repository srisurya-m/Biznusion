import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Casestudies = () => {
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
    <div>
      <div className="main" id="case-studies-main">
        <div className="center">
          <h1>Case Studies</h1>
          <h2>Client Name 1</h2>
          <p>
            Description of the project and the problems faced.<br/> Our approach and
            solution to the problem.<br/> Results achieved and client feedback.
          </p>
          <h2>Client Name 2</h2>
          <p>
            Description of the project and the problems faced.<br/> Our approach and
            solution to the problem.<br/>Results achieved and client feedback.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Casestudies;
