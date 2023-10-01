const Declaration = require("../models/declaration.js");

// Create and Save new Declaration
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content cannot be empty!"
		});
	}

	// Create a Declaration
	const declaration = new Declaration({
		name: req.body.name,
		temperature: req.body.temperature,
		symptoms: req.body.symptoms,
		has_contact: req.body.has_contact || false
	});

	// Save Declaration int the database
	Declaration.create(declaration, (err, data) => {
		if (err) res.status(500).send({
			message: err.message || "Some error occured while creating the Declaration."
		});
		else res.send(data);
	});
};

// Retrive all Declarations from the database (with condition)
exports.findAll = (req, res) => {
	const name = req.query.title;

	Declaration.getAll(name, (err, data) => {
		if (err) res.status(500).send({
			message: err.message || "Some error occurred while retrieving data."
		});
		else res.send(data);
	});
};
