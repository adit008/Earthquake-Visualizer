import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import Visuals from "./Pages/Visuals";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="earthquakes" element={<Visuals />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
