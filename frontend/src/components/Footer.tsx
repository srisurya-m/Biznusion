import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="column">
          <h3>Info</h3>
          <ul>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/career#career-main">Internship</Link>
            </li>
            <li>
              <Link to="/contact#main">Contact us</Link>
            </li>
            <li>
              <Link to="/case-studies#case-studies-main">Case Studies</Link>
            </li>
          </ul>
        </div>
        <div className="column">
          <h3>What we do? </h3>
          <ul>
            <li>
              <Link to="/what-we-do#business-analysis">Business Analysis</Link>
            </li>
            <li>
              <Link to="/what-we-do#data-science">Big Data Analysis</Link>
            </li>
            <li>
              <Link to="/what-we-do#consulting">Consulting</Link>
            </li>
            <li>
              <Link to="/case-studies#case-studies-main">Business Solutions</Link>
            </li>
            <li>
              <Link to="/what-we-do#digital-marketing">Digital Transformation</Link>
            </li>
          </ul>
        </div>
        <div className="column">
          <h3>Legal</h3>
          <ul>
            <li>
              <Link to="/">Customer Agreement</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">GDPR</Link>
            </li>
            <li>
              <Link to="/">Security</Link>
            </li>
            <li>
              <Link to="/">Testimonials</Link>
            </li>
            <li>
              <Link to="/">Media Kit</Link>
            </li>
          </ul>
        </div>
        <div className="column">
          <h3>Newsletter</h3>
          <h4>
            Subscribe to our newsletter for a weekly dose of news, updates,
            helpful tips, and exclusive offers.
          </h4>
          <input type="text" placeholder="Your email" />
          <span>
            <button>SUBSCRIBE</button>
          </span>
          <div className="reference">
            <Link to={"/"}>
              <FaFacebook style={{fontSize:"27px"}}/>
            </Link>
            <Link to={"/"}>
              <FaTwitter style={{fontSize:"27px"}}/>
            </Link>
            <Link to={"/"}>
              <FaLinkedin style={{fontSize:"27px"}}/>{" "}
            </Link>
            <Link to={"/"}>
              {" "}
              <FaGithub style={{fontSize:"27px"}}/>
            </Link>
          </div>
        </div>
      </footer>
  )
}

export default Footer
