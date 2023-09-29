import React, { useState } from "react";
import PeopleDataService from "../services/PeopleDataService";

const AddPerson = () => {
	const [name, setName] = useState("");
	const [temperature, setTemperature] = useState(null);
	const [symptoms, setSymptoms] = useState("");
	const [hasContacts, setHasContacts] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	function savePerson() {
		var data = {
			name: name,
			temperature: temperature,
			symptoms: symptoms,
			has_contacts: hasContacts
		};

		PeopleDataService.create(data).then(response => {
			console.log(response.data);
		}).catch(err => {
			console.log(err);
		});
	}

	function newPerson() {
		setName("");
		setTemperature(null);
		setSymptoms("");
		setHasContacts(false);
		setSubmitted(false);
	}

	return (<div>
		{submitted ? (<div>
			<h4>You submitted successfully!</h4>
			<button onClick={newPerson()}>Add</button>
		</div>) : (<div>
			<label htmlFor="name">Name</label>
			<input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

		
			<label htmlFor="temperature">Temperature</label>
			<input type="number" id="temperature" name="temperature" value={temperature} onChange={(e) => setTemperature(e.target.value)} required />
		
			<label htmlFor="symptoms">Symptoms</label>
			<input type="text" id="symptoms" name="symptoms" value={symptoms} onChange={(e) => setTemperature(e.target.value)} required />
		
			<label htmlFor="has_contacts">Has Contacts with COVID-19 patient?</label>
			<input type="text" id="has_contacts" name="has_contacts" value={hasContacts} onChange={(e) => setHasContacts(e.target.value)} required />

			<button onClick={savePerson()}>Submit</button>
		</div>)}
	</div>);
}

export default AddPerson;