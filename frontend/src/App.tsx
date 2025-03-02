import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Results";
import Finalize from "./pages/Finalize";

const App: React.FC = () => {
  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/results/:testId" element={<Results />} />
          <Route path="/finalize/:testId" element={<Finalize />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
