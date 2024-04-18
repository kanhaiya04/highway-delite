import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Welcome from "./screens/Welcome";
import Home from "./screens/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
};

export default App;
