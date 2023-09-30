import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddDeclaration from "./components/AddDeclaration";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          {/* <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Declaration
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          {/* <Route path="/" element={<TutorialsList/>} /> */}
          {/* <Route path="/tutorials" element={<TutorialsList/>} /> */}
          <Route path="/add" element={<AddDeclaration/>} />
          {/* <Route path="/tutorials/:id" element={<Tutorial/>} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;