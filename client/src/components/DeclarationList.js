import React, { useState, useEffect } from "react";
import DeclarationDataService from "../services/DeclarationDataService";
import { Link } from "react-router-dom";

const DeclarationList = () => {
  const [declarations, setDeclarations] = useState([]);
  const [currentDeclaration, setCurrentDeclaration] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveDeclarations();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveDeclarations = () => {
    DeclarationDataService.getAll()
      .then(response => {
        setDeclarations(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveDeclarations();
    setCurrentDeclaration(null);
    setCurrentIndex(-1);
  };

  const setActiveDeclaration = (declaration, index) => {
    setCurrentDeclaration(declaration);
    setCurrentIndex(index);
  };

  const removeAllDeclarations = () => {
    DeclarationDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    DeclarationDataService.findByName(searchName)
      .then(response => {
        setDeclarations(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Declarations List</h4>

        <ul className="list-group">
          {declarations &&
            declarations.map((declaration, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveDeclaration(declaration, index)}
                key={index}
              >
                {declaration.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllDeclarations}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentDeclaration ? (
          <div>
            <h4>declaration</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentDeclaration.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentDeclaration.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentDeclaration.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/declarations/" + currentDeclaration.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a declaration...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeclarationList;