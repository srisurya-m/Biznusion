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
              <Link to="/">Internship</Link>
            </li>
            <li>
              <Link to="/">Contact us</Link>
            </li>
            <li>
              <Link to="/">Case Studies</Link>
            </li>
          </ul>
        </div>
        <div className="column">
          <h3>What we do? </h3>
          <ul>
            <li>
              <Link to="/">Data Analysis</Link>
            </li>
            <li>
              <Link to="/">Business Analysis</Link>
            </li>
            <li>
              <Link to="/">Big Data Analysis</Link>
            </li>
            <li>
              <Link to="/">Consulting</Link>
            </li>
            <li>
              <Link to="/">Business Solutions</Link>
            </li>
            <li>
              <Link to="/">Digital Transformation</Link>
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
              <FaFacebook />
            </Link>
            <Link to={"/"}>
              <FaTwitter />
            </Link>
            <Link to={"/"}>
              <FaLinkedin />{" "}
            </Link>
            <Link to={"/"}>
              {" "}
              <FaGithub />
            </Link>
          </div>
        </div>
      </footer>
  )
}

export default Footer
