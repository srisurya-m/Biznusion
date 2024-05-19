import { Link } from "react-router-dom";

const Career = () => {
  return (
    <div>
      <div className="main">
        <div className="center">
          <h1 className="heading">Careers</h1>
          <h2>Web Developer Intern</h2>
          <ul className="webdev">
            <li>
              <Link to={"/form-web-dev"}>Apply Now</Link>
            </li>
            <h3 style={{ color: "#079CFF" }}>What you will get?</h3>
            <li>Internship certificate.</li>
            <li>Letter of recommendation (LOR).</li>
            <li>
              Possibility of a pre-placement offer (PPO) based on performance.
            </li>
            <li>Experience working with a startup.</li>
            <h3 style={{ color: "#FF3E88" }}>Responsibilities</h3>
            <div style={{ paddingLeft: "20px" }}>
              <li>1. Enhancing the Website Experience:</li>
            </div>
            <li>
              Collaborate with the team to understand user requirements and
              suggest improvements.
            </li>
            <li>
              Implement new features and functionalities to improve user
              engagement and satisfaction.
            </li>
            <li>
              Ensure the website is responsive and accessible across different
              devices and browsers.
            </li>
            <li>Optimize website performance for speed and efficiency. </li>
            <div style={{ paddingLeft: "20px" }}>
              <li>2. Content Conversion:</li>
            </div>
            <li>
              Transform provided case studies of companies into engaging and
              informative blog posts.
            </li>
            <li>
              Ensure the content is accurate, well-structured, and aligns with
              the website's tone and style.
            </li>
            <li>
              Incorporate SEO best practices to improve the visibility and
              ranking of the blog posts.
            </li>
            <h3 style={{color:"#00D9FF"}}>Minimum skills and qualifications</h3>
            <li>Proficiency in web development HTML, CSS, JavaScript.</li>
            <b><li>React, Angular, or Vue.js.</li></b>
            <li>Familiarity with backend.</li>
            <li>Basic understanding of SEOprinciples and best practices.</li>
            <li>Strong problem-solving skills</li>
            <li>Ability to work independently and as part of a team.</li>
            <li>Excellent communication and collaboration skills.</li>
            <li>Currently pursuing or recently completed a degree in <b>Computer Science, Web Development or equivalent skill / experience.</b></li>
          </ul>
          <h2 style={{textAlign:"center"}}>Data Researcher Intern</h2>
            <ul className="webdev">
                <div style={{paddingLeft:"20px"}}><li><Link to={"/form-data-analyst"}>Apply Now</Link></li></div>
                <h2 >Responsibilities:</h2>
                <li>Conduct data research and analysis</li>
                <li>Assist in developing data models and algorithms</li>
                <li>Collaborate with the team on data-driven projects</li>
                <li>Present findings and insights to the team</li>
                <h2>Requirements:</h2>
                <li>Currently pursuing a degree in Computer Science, Data Science, or related field</li>
                <li>Strong analytical and problem-solving skills</li>
                <li>Proficiency in programming languages such as Python or R</li>
                <li>Ability to work independently and in a team environment</li>
                <div style={{paddingLeft:"20px"}}><li>© 2024 Your Company. All rights reserved.</li></div>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Career;
