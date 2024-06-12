import { startAuthentication } from "@simplewebauthn/browser";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosFingerPrint } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userExist } from "../../redux/reducers/userReducer";

const LoginFingerprint = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const loginChallengeHandler = async () => {
    try {
      const trimmedUsername = username.trim(); // to remove additional white spaces
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/login-challenge`,
        { username: trimmedUsername }
      );
      if (!response.data.success) {
        toast.error(`${response.data.message}`);
      }
      if (response.data.success) {
        const options = response.data.options;
        const registrationResult = await startAuthentication(options);
        const loginResponse = await axios.post(
          `${import.meta.env.VITE_SERVER}/api/v1/user/login-verify`,
          {
            cred: registrationResult,
            username,
          }
        );
        if (loginResponse.data.success) {
          const userData = loginResponse.data.user;
          dispatch(userExist(userData)); // Update user state
          localStorage.setItem("user", JSON.stringify(userData));
          toast.success(`${loginResponse.data.message}`);
          navigate("/");
        } else {
          toast.error(`${loginResponse.data.message}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-fingerprint">
      <main>
        <h1 className="heading">Login with Fingerprint</h1>
        <div>
          <label> Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="div-buttons">
          <button onClick={loginChallengeHandler}>
            <IoIosFingerPrint />
            <span>Login</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default LoginFingerprint;
