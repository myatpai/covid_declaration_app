const Person = require("../models/person.model.js");

// Create and Save new Person
exports.create = (req, res) => {
	// Validate request
	if (req.body) {
		res.status(400).send({
			message: "Content cannor be empty!"
		});
	}

	// Create a Person
	const person = new Person({
		name: req.body.name,
		temperature: req.body.temperature,
		symptom: req.body.symptom,
		has_contact: req.body.has_contact || false
	});

	// Save Person int the database
	Person.create(person, (err, data) => {
		if (err) res.status(500).send({
			message: err.message || "Some error occured while creating the Person."
		});
		else res.send(data);
	});
};

// Retrive all Persons from the database (with condition)
exports.findAll = (req, res) => {
	const name = req.query.title;

	Person.getAll(name, (err, data) => {
		if (err) res.status(500).send({
			message: err.message || "Some error occurred while retrieving data."
		});
		else res.send(data);
	});
};

//  Find a Person by id
exports.findOne = (req, res) => {
	Person.findById(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Person with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({
					message: `Error retriving Person with id ${req.params.id}`
				});
			}
		} else {
			res.send(data);
		} 
	});
};

// find all people with contacts to COVID-19 patients
exports.findAllHaveContacts = (req, res) => {
	Person.getAllHaveContacts((err, data) => {
		if (err) res.status(500).send({
			message: err.message || "Some error occurred while retriveing data."
		});
		else res.send(data);
	});
};

//Update a Person identified by the id in the request
exports.update = (req, res) => {
	// Validate request
	if (!req.body) {
		req.status(400).send({
			message: "Content cannot be empty!"
		});
	}

	console.log(req.body);

	Person.updateById(req.params.id, new Person(req.body), (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Person with id ${rew.params,id}`
				});
			} else {
				res.status(500).send({
					message: `Error updating the Person with id ${req.params.id}`
				});
			}
		} else {
			res.send(data);
		}
	});
};

// Delete a Person with the specific id in the request
exports.delete = (req, res) => {
	Person.remove(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Person with id ${req.params.id}`
				});
			} else {
				res.status(500).send({
					message: `Could not delete Person with id ${req.params.id}`
				});
			}
		} else {
			res.send({ 
				message: `Person was deleted successfully!`
			});
		}
	});
};

// Delete all Persons from the database
exports.deleteAll = (req, res) => {
	Person.removeAll((err, data) => {
		if (err) res.status(500).send({
			message: err.message || "Some error ocurred while removing data."
		});
		else res.send({
			message: `All data were deleted successfully!`
		});
	});
}