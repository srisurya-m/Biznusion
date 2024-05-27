import { FaFacebook, FaGithub, FaSearch, FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import Slider from "react-slick";
// Importing slick carousel CSS files
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/home-bg-1.png";
import image2 from "../assets/home-bg-2.png";
import image3 from "../assets/home-bg-3.png";
import { useEffect, useState } from "react";

const Home = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Delay the animation for a smoother effect
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(timer); // Clear the timer to avoid memory leaks
  }, []);

  const typewriterOptions = {
    strings: [
      "<span>Fusing data inspiring <span style='color:gold'>Business</span></span>...",
      "<span>Transforming ideas into <span style='color:gold'>Innovative Solutions</span></span>...",
      "<span>Creating Opportunities for <span style='color:gold'>Growth</span></span> and <span style='color:gold'>Success</span></span>.",
    ],
    autoStart: true,
    loop: true,
    delay: 60, // optional, typing speed
    wrapperClassName: "typewriter-wrapper",
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="homepage">
        <Slider {...sliderSettings} className="background-slider">
          <div><img src={image1} alt="Slide 1" /></div>
          <div><img src={image2} alt="Slide 2" /></div>
          <div><img src={image3} alt="Slide 3" /></div>
        </Slider>
        <h1 className={`${isAnimated ? "slide-down" : "slide-up"}`}>
          <Typewriter options={typewriterOptions} />
        </h1>
        <div className={`search ${isAnimated ? "slide-down" : "slide-up"}`}>
          <input type="text" placeholder="Search for our services..." />
          <button>
            <FaSearch />
          </button>
        </div>
        <div className={`options ${isAnimated ? "slide-down" : "slide-up"}`}>
          <button>Business Analysis</button>
          <button>Consulting</button>
          <button>Data science</button>
          <button>Case Studies</button>
          <button>Digital transformation</button>
        </div>
      </div>

      {/* footer  */}
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
    </>
  );
};

export default Home;
