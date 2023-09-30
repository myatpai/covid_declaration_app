import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddDeclaration from "./components/AddDeclaration";
import Declaration from "./components/Declaration";
import DeclarationList from "./components/DeclarationList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/declarations"} className="nav-link"> Declarations </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link"> Add Declaration </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<DeclarationList/>} />
          <Route path="/declarations" element={<DeclarationList/>} />
          <Route path="/add" element={<AddDeclaration/>} />
          <Route path="/declarations/:id" element={<Declaration/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;