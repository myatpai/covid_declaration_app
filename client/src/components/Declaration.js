import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import DeclarationDataService from "../services/DeclarationDataService";

const Declaration = props => {
	const { id }= useParams();
	let navigate = useNavigate();

  	const initialDeclarationState = {
		id: 0,
		name: "",
		temperature: 0,
		symptoms: "",
		has_contact: false
	};
	const [currentDeclaration, setCurrentDeclaration] = useState(initialDeclarationState);
	const [message, setMessage] = useState("");

	const getDeclaration = (id) => {
		DeclarationDataService.get(id).then(response => {
			setCurrentDeclaration(response.data);
			console.log(response.data);
		}).catch(e => {
			console.log(e);
		});
	};

	useEffect(() => {
		if (id) getDeclaration(id);
	}, [id]);

	const handleInputChange = event => {
		const { name, value } = event.target;
		setCurrentDeclaration({ ...currentDeclaration, [name]: value });
	};

	const updateHasContact = status => {
		var data = {
			id: currentDeclaration.id,
			title: currentDeclaration.title,
			description: currentDeclaration.description,
			published: status
		};

		DeclarationDataService.update(currentDeclaration.id, data).then(response => {
			setCurrentDeclaration({ ...currentDeclaration, published: status });
			console.log(response.data);
		}).catch(e => {
			console.log(e);
		});
	};

  const updateDeclaration = () => {
    DeclarationDataService.update(currentDeclaration.id, currentDeclaration)
      .then(response => {
        console.log(response.data);
        setMessage("The Declaration was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteDeclaration = () => {
    DeclarationDataService.remove(currentDeclaration.id)
      .then(response => {
        console.log(response.data);
        navigate("/Declarations");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentDeclaration ? (
        <div className="edit-form">
          <h4>Declaration</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentDeclaration.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentDeclaration.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentDeclaration.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentDeclaration.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateHasContact(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateHasContact(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteDeclaration}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateDeclaration}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Declaration...</p>
        </div>
      )}
    </div>
  );
};

export default Declaration;