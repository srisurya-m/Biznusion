import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Typewriter from "typewriter-effect";
import cardImage1 from "../assets/cardImage-1.webp";
import cardImage2 from "../assets/cardImage-2.webp";
import cardImage3 from "../assets/cardImage-3.webp";
import cardImage4 from "../assets/cardImage-4.webp";
import cardImage5 from "../assets/cardImage-5.webp";
import cardImage6 from "../assets/cardImage-6.webp";
import cardImage7 from "../assets/cardImage-7.webp";
import homeBg from "../assets/home-bg.png";
import ContacthomeBg from "../assets/home-contact-bg.png";
import analysisImage from "../assets/working-model-analysis.jpg";
import consultingImage from "../assets/working-model-consulting.jpg";
import successImage from "../assets/working-model-success.jpg";

const cardData = [
  {
    image: cardImage1,
    heading: "CASE STUDY",
    subHeading:
      "Creating five-star associate experiences: Marriott International",
    description:
      "Biznusion International created a new global HR hub that delivers employee experiences as exceptional as the guest experiences.",
  },
  {
    image: cardImage2,
    heading: "RESEARCH REPORT",
    subHeading: "Reinvention in the age of generative Al",
    description: "This is the description for card 2.",
  },
  {
    image: cardImage3,
    heading: "CASE STUDY",
    subHeading: "Generative Al in the driver's seat: BMW",
    description: "This is the description for card 2.",
  },
  {
    image: cardImage4,
    heading: "ANNOUNCEMENT",
    subHeading:
      "Biznusion takes new steps to help clients scale generative Al responsibly",
    description: "This is the description for card 2.",
  },
  {
    image: cardImage5,
    heading: "Card Heading 2",
    subHeading: "Card Sub-heading 2",
    description: "This is the description for card 2.",
  },
  {
    image: cardImage6,
    heading: "Card Heading 2",
    subHeading: "Card Sub-heading 2",
    description: "This is the description for card 2.",
  },
  {
    image: cardImage7,
    heading: "Card Heading 2",
    subHeading: "Card Sub-heading 2",
    description: "This is the description for card 2.",
  },
  {
    image: cardImage1,
    heading: "Card Heading 2",
    subHeading: "Card Sub-heading 2",
    description: "This is the description for card 2.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [isAnimated, setIsAnimated] = useState(false);
  const joinRef = useRef(null);

  const handleScheduleCall = () => {
    navigate("/contact/schedule-call");
  };
  const handleJoinCall = () => {
    navigate("/contact/video-call");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (joinRef.current) {
      observer.observe(joinRef.current);
    }

    return () => {
      if (joinRef.current) {
        observer.unobserve(joinRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");

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

    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".section-new");
    const options = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Clean up the observer on component unmount
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
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

  const serviceSliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  const servicesList = [
    { name: "Predictive Analytics and Machine Learning", anchor: "#predictive-analytics-1" },
    { name: "Business Intelligence and Data Visualization", anchor: "#business-intelligence-2" },
    { name: "Natural Language Processing", anchor: "#natural-language-processing-3" },
    { name: "Deep Learning and AI Applications", anchor: "#deep-learning-4" },
    { name: "Big Data Processing", anchor: "#big-data-processing-5" },
    { name: "Data Engineering", anchor: "#data-engineering-6" },
    { name: "Database Management and Optimization", anchor: "#database-management-7" },
    { name: "Cloud Computing and Deployment", anchor: "#cloud-computing-8" },
  ];

  return (
    <>
      <div className="homepage">
        <img className="home-background" src={homeBg} alt="home background" />
        <h1 className={`${isAnimated ? "slide-down" : "slide-up"}`}>
          <Typewriter options={typewriterOptions} />
        </h1>
        <div
          className={`call-to-action ${isAnimated ? "slide-down" : "slide-up"}`}
        >
          <button className="primary-button" onClick={handleScheduleCall}>
            Schedule a <span className="highlight">FREE</span> Consultation with
            Our Experts
          </button>{" "}
          <span className="or">Or</span>
          <button className="primary-button" onClick={handleJoinCall}>
            Join your Scheduled Call
          </button>
        </div>

        <div className={`options ${isAnimated ? "slide-down" : "slide-up"}`}>
          <button onClick={()=>{navigate("/what-we-do#business-analysis")}}>Business Analysis</button>
          <button onClick={()=>{navigate("/what-we-do#consulting")}}>Consulting</button>
          <button onClick={()=>{navigate("/what-we-do#data-science")}}>Data science</button>
          <button onClick={()=>{navigate("/case-studies#case-studies-main")}}>Case Studies</button>
          <button onClick={()=>{navigate("/what-we-do#digital-marketing")}}>Digital transformation</button>
        </div>
      </div>

      <div className="working-model-new">
        <h2>Our Working Model</h2>
        <div className="section-new">
          <div
            className="card-content"
            onClick={() => navigate("/consultation#consultation-main")}
          >
            <h3>Consultation</h3>
            <p>Tailored Guidance for Your Unique Needs</p>
            <img
              src={consultingImage}
              alt="Consultation Icon"
              className="card-icon"
            />
          </div>
        </div>
        <div className="section-new">
          <div className="card-content" onClick={() => navigate("/analysis#analysis-main")}>
            <h3>Analysis</h3>
            <p>In-Depth Insights for Data-Driven Decisions</p>
            <img
              src={analysisImage}
              alt="Analysis Icon"
              className="card-icon"
            />
          </div>
        </div>
        <div className="section-new">
          <div className="card-content" onClick={() => navigate("/success#success-main")}>
            <h3>Growth & Success</h3>
            <p>Achieving Excellence Through Continuous Improvement</p>
            <img src={successImage} alt="Growth Icon" className="card-icon" />
          </div>
        </div>
      </div>
      <div className="services-section">
        <h2>Our Services</h2>
        <div className="services-content">
          <div className="services-list">
            <ul>
              {servicesList.map((service, index) => (
                <li
                  className="services-list-li"
                  key={index}
                  onClick={() => navigate(`/what-we-do${service.anchor}`)}
                >
                  {service.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="services-carousel">
            <Slider {...serviceSliderSettings}>
              <div className="service-card">
                <h3>Business Transformation</h3>
                <p>
                  We assist enterprises in driving sustainable growth through
                  innovative strategies and solutions tailored to their unique
                  challenges. Our expert team ensures a seamless transition and
                  continuous improvement for lasting success.
                </p>
              </div>
              <div className="service-card">
                <h3>Educational Transformation</h3>
                <p>
                  Our services empower educational institutions by integrating
                  cutting-edge technologies and progressive methodologies. We
                  strive to enhance the learning experience, making education
                  more accessible, engaging, and effective for all stakeholders.
                </p>
              </div>
              <div className="service-card">
                <h3>Healthcare Transformation</h3>
                <p>
                  We revolutionize healthcare delivery by leveraging advanced
                  technologies and patient-centered care models. Our solutions
                  aim to improve healthcare outcomes, streamline operations, and
                  foster a compassionate environment for patients and providers
                  alike.
                </p>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      <div className="card-container">
        {cardData.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={`Card ${index + 1}`} />
            <div className="card-content">
              <h3>{card.heading}</h3>
              <h4>{card.subHeading}</h4>
            </div>
            <div className="card-hover">
              <p>{card.description}</p>
              <button>Expand</button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-container">
        <div className="value-text">Transformation</div>
        <div className="sub-text">
          We Provide Data Driven Solutions for Growth
        </div>
      </div>

      <div className="queries">
        <img src={ContacthomeBg} alt=""  className="contactBg"/>
        <button className="contact-btn" onClick={() => navigate("/contact#main")}>Any Queries? Contact Us.</button>
      </div>

      <div className="join" ref={joinRef}>
        <h1>Want to Join Us?</h1>
        <button onClick={() => navigate("/career#career-main")}>Let's Connect!</button>
      </div>
    </>
  );
};

export default Home;
