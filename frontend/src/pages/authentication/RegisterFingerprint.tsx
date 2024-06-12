import { startRegistration } from "@simplewebauthn/browser";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userExist } from "../../redux/reducers/userReducer";

const RegisterFingerprint = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const registerChallengeHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/register-challenge/${id}`
      );
      if (!response.data.user) {
        const options = response.data.options;
        const registrationResult = await startRegistration(options);
        const verificationResponse = await axios.post(
          `${import.meta.env.VITE_SERVER}/api/v1/user/register-verify/${id}`,
          {
            cred: registrationResult,
          }
        );
        dispatch(userExist(verificationResponse.data.key));
        localStorage.setItem(
          "user",
          JSON.stringify(verificationResponse.data.key)
        );
        navigate("/");
      }
      toast.success(`${response.data.message}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-fingerprint">
      <main>
        <h1 className="heading">Register Your Fingerprint</h1>
        <div className="div-buttons">
          <button onClick={registerChallengeHandler}>
            <FaUserAlt />
            <span>Register</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default RegisterFingerprint;
