import { ChangeEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ContactFormType } from "../types/types";

const ContactUs = () => {
  const [formData, setFormData] = useState<ContactFormType>({
    name: "",
    email: "",
    message: "",
  });

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

  return (
    <div>
      <div className="main">
        <div className="contact-center-form">
          <h1 style={{ color: "white" }}>Contact Us</h1>
          <form className="form" onSubmit={submitHandler}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Message:</label>
            <textarea
              style={{ height: "10em", padding: "10px" }}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button style={{ marginTop: "20px"}} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
