import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosFingerPrint } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const loginWithGoogleHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/new`,
        {
          username: user.displayName!,
          photo: user.photoURL!,
          email: user.email!,
          role: "user",
          _id: user.uid,
        }
      );

      if (response.data.success) {
        dispatch(userExist(response.data.user));
        const userData = response.data.user;
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success(response.data.message);
        if (!response.data.user.credentialPublicKey) {
          if (response.data.user._id !== user.uid) {
            navigate(`/login/${response.data.user._id}`);
          } else {
            navigate(`/login/${user.uid}`);
          }
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("SignIn failed");
      console.log(error);
    }
  };

  const loginHandler = async () => {
    try {
      const trimmedUsername = username.trim(); // to remove additional white spaces
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/new`,
        {
          username: trimmedUsername,
          photo: import.meta.env.VITE_DEFAULT_PHOTO,
          email,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setUsername("");
        setEmail("");
        const userData = response.data.user;
        dispatch(userExist(userData)); // Update user state
        localStorage.setItem("user", JSON.stringify(userData));
        if (!response.data.user.credentialPublicKey) {
          navigate(`/login/${response.data.user._id}`);
        }
      } else {
        toast.error(response.data.message);
        setUsername("");
        setEmail("");
      }
    } catch (error) {
      toast.error("SignIn failed");
      console.log(error);
    }
  };

  const loginWithFingerHandler = async () => {
    navigate("/login/fingerprint");
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
        <div>
          <label> Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="div-buttons">
          <button onClick={loginHandler}>
            <FaUserAlt />
            <span>Login</span>
          </button>
        </div>
        <div className="div-buttons">
          <p>Or Continue with</p>
          <button onClick={loginWithGoogleHandler}>
            <FcGoogle />
            <span>Sign In with Google</span>
          </button>
          <button onClick={loginWithFingerHandler}>
            <IoIosFingerPrint />
            <span>Login with fingerprint</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
