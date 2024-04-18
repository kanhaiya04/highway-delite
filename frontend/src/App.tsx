import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Welcome from "./screens/Welcome";
import Home from "./screens/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
};

export default App;
