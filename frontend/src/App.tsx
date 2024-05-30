import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import RegisterFingerprint from "./pages/RegisterFingerprint";
import LoginFingerprint from "./pages/LoginFingerprint";
import { useDispatch, useSelector } from "react-redux";
import { UserResponse, userReducerInitialState } from "./types/reducerTypes";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { userExist, userNotExist } from "./redux/reducers/userReducer";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";

//lazy loading
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Whatwedo = lazy(() => import("./pages/Whatwedo"));
const Casestudies = lazy(() => import("./pages/Casestudies"));
const Career = lazy(() => import("./pages/Career"));
const Webdev = lazy(() => import("./pages/forms/Webdev"));
const DataAnalyst = lazy(() => import("./pages/forms/DataAnalyst"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Login = lazy(() => import("./pages/Login"));


function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  useEffect(() => {
   const localUser = localStorage.getItem('user');
    if (localUser) {
      const user = JSON.parse(localUser);
      dispatch(userExist(user));
    } else {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const { data }: { data: UserResponse } = await axios.get(
            `${import.meta.env.VITE_SERVER}/api/v1/user/${user.uid}`
          );
          dispatch(userExist(data.user));
        } else {
          dispatch(userNotExist());
        }
      });
    }
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/what-we-do" element={<Whatwedo />} />
            <Route path="/case-studies" element={<Casestudies />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/form-web-dev" element={<Webdev />} />
            <Route path="/form-data-analyst" element={<DataAnalyst />} />
            <Route path="/login" element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/:id" element={<RegisterFingerprint />} />
            <Route path="/fingerprint" element={<LoginFingerprint />} />
          </Routes>
          <Toaster position="top-center" />
        </Suspense>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
