import { ChangeEvent, useState } from "react";
import { FormDataType } from "../../types/types";
import axios from "axios";
import toast from "react-hot-toast";

const DataAnalyst = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phoneNumber: 0,
    dob: null,
    address: "",
    degree: "",
    university: "",
    major: "",
    skills: "",
    experience: "",
    projects: "",
    certifications: "",
    referenceName: "",
    linkedinProfile: "",
    portfolio: "",
    info: "",
    graduationYear: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      dob: e.target.value ? new Date(e.target.value) : null,
    }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/data-analyst/form`,
        formData
      );
      setFormData({
        name: "",
        email: "",
        phoneNumber: 0,
        dob: null,
        address: "",
        degree: "",
        university: "",
        major: "",
        skills: "",
        experience: "",
        projects: "",
        certifications: "",
        referenceName: "",
        linkedinProfile: "",
        portfolio: "",
        info: "",
        graduationYear: 0,
      });
      toast.success(`${response.data.message}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="form-webdev-main">
        <div className="center-form">
          <h1>Jr. Data Analyst/Researcher Internship</h1>
          <ul className="webdev">
            <li>
              Please write <b style={{ color: "red" }}>No</b> if you are not
              sure about the Question!
            </li>
            <li>Don't give wrong information</li>
            <li>
              <b style={{ color: "red" }}>
                {" "}
                You will get an interview call soon!!
              </b>
            </li>
            <h2>Personal Information</h2>
          </ul>
          <form className="form" onSubmit={submitHandler}>
            <label>Full Name:</label>
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
            <label>Phone Number:</label>
            <input
              style={{ width: "30%" }}
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <label>Date of Birth:</label>
            <input
              style={{ width: "30%" }}
              name="dob"
              type="date"
              value={
                formData.dob ? formData.dob.toISOString().substring(0, 10) : ""
              }
              onChange={handleDateChange}
              required
            />
            <label>Address:</label>
            <textarea
              style={{ height: "10em", padding: "10px" }}
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <h2>Education</h2>
            <label>Degree:</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
            />
            <label>University/College:</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
            />
            <label>Major:</label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              required
            />
            <label>Graduation Year:</label>
            <input
              style={{ width: "20%" }}
              type="number"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              required
            />
            <h2>Skills and Qualifications</h2>
            <label>Skills:</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
            />
            <label>Experience:</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
            <label>Projects:</label>
            <textarea
              style={{ height: "5em", padding: "10px" }}
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              required
            />
            <label>Certifications:</label>
            <textarea
              style={{ height: "5em", padding: "10px" }}
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              required
            />
            <h2>Additional Information</h2>
            <label>Reference (Name/Contact):</label>
            <input
              type="text"
              name="referenceName"
              value={formData.referenceName}
              onChange={handleChange}
            />
            <label>LinkedIn Profile:</label>
            <input
              style={{ width: "20%" }}
              type="url"
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleChange}
            />
            <label>Portfolio/Website:</label>
            <input
              style={{ width: "20%" }}
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
            />
            <label>Any other information:</label>
            <textarea
              style={{ height: "6em", padding: "10px" }}
              name="info"
              value={formData.info}
              onChange={handleChange}
            />

            <button style={{ marginTop: "20px", color: "white" }} type="submit">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataAnalyst;
