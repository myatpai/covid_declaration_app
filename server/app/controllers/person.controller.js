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
			message: err.message || "Some error occurred while retrieving persons."
		});
		else res.send(data);
	});
};

//  Find a Person by id