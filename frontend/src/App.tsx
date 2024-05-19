import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Whatwedo from "./pages/Whatwedo";
import Casestudies from "./pages/Casestudies";
import Career from "./pages/Career";
import Webdev from "./pages/forms/Webdev";
import { Toaster } from "react-hot-toast";
import DataAnalyst from "./pages/forms/DataAnalyst";
import ContactUs from "./pages/ContactUs";

function App() {

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/what-we-do" element={<Whatwedo/>} />
          <Route path="/case-studies" element={<Casestudies/>} />
          <Route path="/career" element={<Career/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/form-web-dev" element={<Webdev/>} />
          <Route path="/form-data-analyst" element={<DataAnalyst/>} />
        </Routes>
        <Toaster position="top-center" />
      </Router>
    </>
  )
}

export default App
