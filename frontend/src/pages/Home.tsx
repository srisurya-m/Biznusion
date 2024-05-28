import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
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
import image1 from "../assets/home-bg-1.png";
import image2 from "../assets/home-bg-2.png";
import image3 from "../assets/home-bg-3.png";

const carouselData = [
  {
    image: image1,
    heading: "Heading 1",
    description: "Description for image 1. <a href='#'>Read more</a>",
  },
  {
    image: image2,
    heading: "Heading 2",
    description: "Description for image 2. <a href='#'>Read more</a>",
  },
  {
    image: image3,
    heading: "Heading 3",
    description: "Description for image 3. <a href='#'>Read more</a>",
  },
];

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
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => {
      clearTimeout(timer);
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
          <div>
            <img src={image1} alt="Slide 1" />
          </div>
          <div>
            <img src={image2} alt="Slide 2" />
          </div>
          <div>
            <img src={image3} alt="Slide 3" />
          </div>
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

      <div className="value-text">360° value</div>
      <div className="sub-text">
        Every day, we embrace change and create value for all our stakeholders,
        in every part of the world.
      </div>

      <div className="carousel-with-content">
        <h2>Our Clients</h2>
        <Slider {...sliderSettings}>
          {carouselData.map((item, index) => (
            <div className="carousel-item" key={index}>
              <section className="left">
                <img src={item.image} alt={`Carousel ${index + 1}`} />
              </section>
              <section className="right">
                <h3>{item.heading}</h3>
                <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
              </section>
            </div>
          ))}
        </Slider>
      </div>

      <div className="join">
        <h1>Want to Join Us?</h1>
        <button>Let's Connect!</button>
      </div>
    </>
  );
};

export default Home;
