import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

import DeclarationDataService from "../services/DeclarationDataService";

const optionsArray = ["Cough", "Smell/test imapairment", "Fatigue", "Sore throat", "Shortness of breath", "Diarrhea", "Runny nose"];

const AddDeclaration = () => {
	const initialDeclarationState = {
		name: "",
		temperature: 36.1,
		symptoms: "",
		has_contact: false
	};
	const [declaration, setDeclaration] = useState(initialDeclarationState);
	const [submitted, setSubmitted] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setDeclaration({ ...declaration, [name]: value });
	}

	const saveDeclaration = () => {
		var data = {
			name: declaration.name,
			temperature: declaration.temperature,
			symptoms: declaration.symptoms.toString(),
			has_contact: declaration.has_contact ? 1 : 0
		};
		console.log(data);
		DeclarationDataService.create(data).then(response => {
			setDeclaration({
				name: data.name,
				temperature: data.temperature,
				symptoms: data.symptoms,
				has_contact: data.has_contact
			});
			setSubmitted(true);
			console.log(response.data);
		}).catch(err => {
			console.log(err);
		});
	}

	return (<div className="container p-5">
		{submitted ? (<div className="row g-3 align-items-center">
			<h4>You submitted successfully!</h4>
			<Link to={"/"} className="m-1 btn btn-primary col-sm-2"> Back </Link>
		</div>) : (<div className="row g-3 align-items-center">
			<div className="row mb-3">
				<label className="col-sm-2 col-form-label" htmlFor="name">Name</label>
				<div className="col-sm-10">
					<input className="form-control" type="text" id="name" name="name" value={declaration.name} onChange={handleInputChange} required />
				</div>
			</div>
		
			<div className="row mb-3">
				<label className="col-sm-2 col-form-label" htmlFor="temperature">Temperature</label>
				<div className="col-sm-10">
					<input className="form-control" type="number" id="temperature" name="temperature" value={declaration.temperature} onChange={handleInputChange} min="36" step="0.01" required />
				</div>
			</div>
		
			<div className="row mb-3">
				<label className="col-sm-2 col-form-label" htmlFor="symptoms">Symptoms</label>
				<div className="col-sm-10">
					<p>Do you have any of the following symptoms now or within the last 14 days (even if your symptoms are mild)?</p>
					<DropdownMultiselect options={optionsArray} name="symptoms" handleOnChange={(selected) => {setDeclaration({ ...declaration, symptoms: selected });}} />
				</div>
			</div>

			<div className="mb-3 from-check">
				<input className="form-check-input" type="checkbox" id="has_contact" name="has_contact" value={declaration.has_contact} onChange={handleInputChange} required />
				<label className="form-check-label" htmlFor="has_contact">&nbsp;Have you been in contact with anyone who is suspected to have/ has been diagnosed with Covid-19 within the last 14 days?</label>
			</div>

			<button className="m-1 btn btn-success col-sm-2" onClick={saveDeclaration}>Submit</button>

			<Link to={"/"} className="m-1 btn btn-primary col-sm-2"> Back </Link>
		</div>)}
	</div>);
}

export default AddDeclaration;
