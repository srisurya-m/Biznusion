import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ContactFormType } from "../types/types";
import { AiOutlineNotification } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

const ContactUs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleBookSlot = () => {
    alert("AI enabled Chat Bot, feature is coming soon!");
  };

  const [formData, setFormData] = useState<ContactFormType>({
    name: "",
    email: "",
    message: "",
  });

  const handleScheduleCall = () => {
    navigate('/contact/schedule-call');
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/contact-us/form`,
        formData
      );
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      toast.success(`${response.data.message}`);
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
      <div className="contact-us-main" id="main">
        <div className="contact-us-center-form">
          <h1 className="contact-us-title">Contact Us</h1>
          <form className="contact-us-form" onSubmit={submitHandler}>
            <label className="contact-us-label">Name:</label>
            <input
              className="contact-us-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label className="contact-us-label">Email:</label>
            <input
              className="contact-us-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className="contact-us-label">Message:</label>
            <textarea
              className="contact-us-textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button className="contact-us-button" type="submit">
              Submit
            </button>
          </form>
          <label htmlFor="video-call-button" className="navigate-video-call-label"> Have Questions About Our Packages? Chat with an Expert!</label>
          <button className="navigate-video-call-button" id="video-call-button" onClick={handleScheduleCall}>
          Schedule a Call with Our Experts
          </button>
        </div>
      </div>
      <div className="video-call-app">
        <div className="notification-button-container">
          <AiOutlineNotification
            className="notification-icon"
            onClick={handleBookSlot}
          />
          <button className="notification-button" onClick={handleBookSlot}>
            Chat Bot coming Soon!
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
