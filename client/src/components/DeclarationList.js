import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DeclarationDataService from "../services/DeclarationDataService";

const DeclarationList = () => {
  const [declarations, setDeclarations] = useState([]);

  useEffect(() => {
    retrieveDeclarations();
  }, []);

  const retrieveDeclarations = () => {
    DeclarationDataService.getAll().then(response => {
      setDeclarations(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  };

  return (
    <div className="container p-3 list row">
      <h4>Declarations</h4>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Temperature</th>
            <th scope="col">Symptoms</th>
            <th scope="col">Has contact</th>
          </tr>
        </thead>
        <tbody>
        {declarations &&declarations.map((declaration, index) => (
          <tr key={index}>
            <th scope="row">{ declaration.id }</th>
            <td>{ declaration.name }</td>
            <td>{ declaration.temperature }</td>
            <td>{ declaration.symptoms }</td>
            <td>{ (declaration.has_contact === 1) ? 'Yes' : 'No' }</td>
          </tr>
        ))}
        </tbody>
      </table>
      <Link to={"/add"} className="m-3 btn col-2 btn-success"> Add Declaration </Link>
    </div>
  );
};

export default DeclarationList;