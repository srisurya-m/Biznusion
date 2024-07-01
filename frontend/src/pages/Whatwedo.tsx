import { useEffect } from "react";
import {
  FaBusinessTime,
  FaLanguage,
  FaBrain,
  FaServer,
  FaTools,
  FaDatabase,
  FaCloud,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

const servicesData = [
  {
    id: "predictive-analytics-1",
    title: "Predictive Analytics and Machine Learning",
    description:
      "Using advanced algorithms and statistical models, we predict future trends and behaviors to help businesses make informed decisions. Our expertise in machine learning enables us to build models that can learn from data, identify patterns, and make accurate predictions.",
    projects: [
      { name: "Customer churn prediction" },
      { name: "Sales forecasting" },
      { name: "Demand prediction" },
      { name: "Recommendation systems" },
    ],
    skills: ["Python", "R", "scikit-learn", "TensorFlow", "PyTorch"],
    icon: FaBusinessTime,
  },
  {
    id: "business-intelligence-2",
    title: "Business Intelligence and Data Visualization",
    description:
      "We transform raw data into meaningful insights through interactive dashboards and visualizations. Our business intelligence solutions help organizations monitor key performance indicators (KPIs), track progress, and make data-driven decisions.",
    projects: [
      { name: "Building interactive dashboards" },
      {
        name: "Real-time data monitoring systems",
        image: "path/to/image6.jpg",
      },
      { name: "KPI tracking" },
    ],
    skills: ["Power BI", "Tableau", "SQL", "Python (matplotlib, Plotly)"],
    icon: FaDatabase,
  },
  {
    id: "natural-language-processing-3",
    title: "Natural Language Processing (NLP)",
    description:
      "Our NLP solutions enable machines to understand and interpret human language, facilitating tasks such as sentiment analysis, text summarization, and machine translation. We harness the power of language models to unlock valuable insights from text data.",
    projects: [
      { name: "Sentiment analysis" },
      { name: "Text summarization" },
      { name: "Machine translation" },
    ],
    skills: ["Python", "NLTK", "spaCy", "BERT", "GPT"],
    icon: FaBrain,
  },
  {
    id: "deep-learning-4",
    title: "Deep Learning and AI Applications",
    description:
      "We develop cutting-edge AI applications using deep learning techniques. Our projects include image and video recognition, speech recognition, and autonomous systems, leveraging the power of neural networks to solve complex problems.",
    projects: [
      { name: "Image and video recognition" },
      { name: "Speech recognition" },
      { name: "Autonomous systems" },
    ],
    skills: ["Python", "TensorFlow", "PyTorch", "CNNs", "RNNs"],
    icon: FaLanguage,
  },
  {
    id: "big-data-processing-5",
    title: "Big Data Processing",
    description:
      "Our expertise in big data technologies allows us to handle and analyze large volumes of data efficiently. We provide solutions for data warehousing, real-time data processing, and big data analytics, helping businesses gain valuable insights from their data.",
    projects: [
      { name: "Data warehousing" },
      { name: "Real-time data processing" },
      { name: "Big data analytics" },
    ],
    skills: ["Hadoop", "Spark", "SQL", "", "NoSQL databases"],
    icon: FaServer,
  },
  {
    id: "data-engineering-6",
    title: "Data Engineering",
    description:
      "We build robust ETL pipelines and data integration solutions to ensure seamless data flow across systems. Our data engineering services include data warehousing and data architecture design, enabling organizations to manage their data efficiently.",
    projects: [
      { name: "ETL pipelines" },
      { name: "Data integration" },
      { name: "Data warehousing" },
    ],
    skills: ["SQL", "Python", "Apache Airflow", "ETL tools"],
    icon: FaTools,
  },
  {
    id: "database-management-7",
    title: "Database Management and Optimization",
    description:
      "Our database management services ensure optimal performance and reliability of your databases. We specialize in database design, performance tuning, and data migration, providing solutions that enhance data accessibility and efficiency.",
    projects: [
      { name: "Database design" },
      { name: "Performance tuning" },
      { name: "Data migration" },
    ],
    skills: ["SQL", "MySQL", "PostgreSQL", "MongoDB"],
    icon: FaDatabase,
  },
  {
    id: "cloud-computing-8",
    title: "Cloud Computing and Deployment",
    description:
      "We deploy machine learning models and data solutions on cloud platforms to ensure scalability and flexibility. Our cloud computing services include setting up cloud-based data warehouses and CI/CD pipelines, enabling efficient and secure data processing.",
    projects: [
      {
        name: "Deploying machine learning models on the cloud",
      },
      {
        name: "Setting up cloud-based data warehouses",
      },
    ],
    skills: [
      "AWS",
      "Azure",
      "Google Cloud Platform (GCP)",
      "Docker",
      "Kubernetes",
    ],
    icon: FaCloud,
  },
];

const Whatwedo = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    const scrollers = document.querySelectorAll<HTMLDivElement>(".scroller");

    scrollers.forEach((scroller) => {
      const scrollerInner =
        scroller.querySelector<HTMLDivElement>(".scroller__inner");
      if (!scrollerInner) return;

      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLDivElement;
        duplicatedItem.setAttribute("aria-hidden", "true");
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }, []);

  return (
    <div className="whatwedo-main">
      <h2>Our Services</h2>
      <div className="whatwedo-center">
        {servicesData.map((service) => (
          <div key={service.id} id={service.id} className="content-container">
            <div className="heading">
              <h3>{service.title}</h3>
            </div>
            <div className="content">
              <p>{service.description}</p>
              <service.icon className="icon" />
              <div className="projects">
                <h4>Our Work in this Domain:</h4>
                <div className="projects-list">
                  {service.projects.map((project) => (
                    <div key={project.name} className="project-item">
                      <p>{project.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h4 style={{marginTop:"16px"}}>Technologies used:</h4>
              <div className="scroller" data-animated="true" data-speed="slow">
                <div className="scroller__inner">
                  {service.skills.map((skill) => (
                    <div key={skill} className="scroller__inner">
                      <p>{skill}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Whatwedo;
