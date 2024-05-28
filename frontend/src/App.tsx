import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

//lazy loading
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Whatwedo = lazy(() => import("./pages/Whatwedo"));
const Casestudies = lazy(() => import("./pages/Casestudies"));
const Career = lazy(() => import("./pages/Career"));
const Webdev = lazy(() => import("./pages/forms/Webdev"));
const DataAnalyst = lazy(() => import("./pages/forms/DataAnalyst"));
const ContactUs = lazy(() => import("./pages/ContactUs"));


function App() {
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
          </Routes>
          <Toaster position="top-center" />
        </Suspense>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
