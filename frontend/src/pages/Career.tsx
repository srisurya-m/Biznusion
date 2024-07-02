import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Career = () => {
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
    <div className="career-page">
      <div className="career-main" id="career-main">
        <div className="career-center">
          <h1 className="career-heading">Careers</h1>
          <h2 className="position-title">Web Developer Intern</h2>
          <ul className="webdev">
            <li>
              <Link to={"/form-web-dev"} className="apply-link">Apply Now</Link>
            </li>
            <h3 className="subheading" >What you will get?</h3>
            <li>Internship certificate.</li>
            <li>Letter of recommendation (LOR).</li>
            <li>Possibility of a pre-placement offer (PPO) based on performance.</li>
            <li>Experience working with a startup.</li>
            <h3 className="subheading">Responsibilities</h3>
            <div className="sublist">
              <li>1. Enhancing the Website Experience:</li>
            </div>
            <li>Collaborate with the team to understand user requirements and suggest improvements.</li>
            <li>Implement new features and functionalities to improve user engagement and satisfaction.</li>
            <li>Ensure the website is responsive and accessible across different devices and browsers.</li>
            <li>Optimize website performance for speed and efficiency. </li>
            <div className="sublist">
              <li>2. Content Conversion:</li>
            </div>
            <li>Transform provided case studies of companies into engaging and informative blog posts.</li>
            <li>Ensure the content is accurate, well-structured, and aligns with the website's tone and style.</li>
            <li>Incorporate SEO best practices to improve the visibility and ranking of the blog posts.</li>
            <h3 className="subheading">Minimum skills and qualifications</h3>
            <li>Proficiency in web development HTML, CSS, JavaScript.</li>
            <b><li>React, Angular, or Vue.js.</li></b>
            <li>Familiarity with backend.</li>
            <li>Basic understanding of SEO principles and best practices.</li>
            <li>Strong problem-solving skills</li>
            <li>Ability to work independently and as part of a team.</li>
            <li>Excellent communication and collaboration skills.</li>
            <li>Currently pursuing or recently completed a degree in <b>Computer Science, Web Development or equivalent skill / experience.</b></li>
          </ul>
          <h2 className="position-title" style={{ textAlign: "center" }}>Data Researcher Intern</h2>
          <ul className="webdev">
            <div className="sublist">
              <li><Link to={"/form-data-analyst"} className="apply-link">Apply Now</Link></li>
            </div>
            <h3 className="subheading">Responsibilities:</h3>
            <li>Conduct data research and analysis</li>
            <li>Assist in developing data models and algorithms</li>
            <li>Collaborate with the team on data-driven projects</li>
            <li>Present findings and insights to the team</li>
            <h3 className="subheading">Requirements:</h3>
            <li>Currently pursuing a degree in Computer Science, Data Science, or related field</li>
            <li>Strong analytical and problem-solving skills</li>
            <li>Proficiency in programming languages such as Python or R</li>
            <li>Ability to work independently and in a team environment</li>
            <div className="sublist"><li>© 2024 Biznusion. All rights reserved.</li></div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Career;
