import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userReducerInitialState } from "../types/reducerTypes";
import axios from "axios";
import toast from "react-hot-toast";
import { updateUser } from "../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    photo: user?.photo || "",
  });
  const [photoFile, setPhotoFile] = useState<File>();

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormData((prevData) => ({
            ...prevData,
            photo: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      const formDataToSend = new FormData(); // Create a FormData object
      const trimmedUsername = formData.username.trim();
      const trimmedEmail = formData.email.trim();
      formDataToSend.append("username", trimmedUsername); // Append username
      formDataToSend.append("email", trimmedEmail); // Append email
      if (photoFile) formDataToSend.append("photo", photoFile); // Append photo if it's changed

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER}/api/v1/user/update-user/${user?._id}`,
        formDataToSend, // Send FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );

      dispatch(updateUser(response.data.updatedUser));
      localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
      setLoading(false);
      navigate("/");
      toast.success(
        `${response.data.updatedUser.username} your credentials are updated`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="my-profile">
      <h1>My Profile</h1>
      <div
        className={`photo-container ${loading ? "loading" : ""}`}
        onClick={handlePhotoClick}
      >
        {loading && <div className="loader"></div>}
        {formData.photo && (
          <img src={formData.photo} alt="Profile" className="profile-photo" />
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handlePhotoChange}
      />
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="update-button" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
