const Declaration = require("../models/declaration.js");

// Create and Save new Declaration
exports.create = (req, res) => {
	// Validate request
	if (req.body) {
		res.status(400).send({
			message: "Content cannor be empty!"
		});
	}

	// Create a Declaration
	const Declaration = new Declaration({
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

//  Find a Declaration by id
exports.findOne = (req, res) => {
	Declaration.findById(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Declaration with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({
					message: `Error retriving Declaration with id ${req.params.id}`
				});
			}
		} else {
			res.send(data);
		} 
	});
};

// find all people with contacts to COVID-19 patients
exports.findAllHaveContact = (req, res) => {
	Declaration.getAllHaveContact((err, data) => {
		if (err) res.status(500).send({
			message: err.message || "Some error occurred while retriveing data."
		});
		else res.send(data);
	});
};

//Update a Declaration identified by the id in the request
exports.update = (req, res) => {
	// Validate request
	if (!req.body) {
		req.status(400).send({
			message: "Content cannot be empty!"
		});
	}

	console.log(req.body);

	Declaration.updateById(req.params.id, new Declaration(req.body), (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Declaration with id ${rew.params,id}`
				});
			} else {
				res.status(500).send({
					message: `Error updating the Declaration with id ${req.params.id}`
				});
			}
		} else {
			res.send(data);
		}
	});
};

// Delete a Declaration with the specific id in the request
exports.delete = (req, res) => {
	Declaration.remove(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Declaration with id ${req.params.id}`
				});
			} else {
				res.status(500).send({
					message: `Could not delete Declaration with id ${req.params.id}`
				});
			}
		} else {
			res.send({ 
				message: `Declaration was deleted successfully!`
			});
		}
	});
};

// Delete all Declarations from the database
exports.deleteAll = (req, res) => {
	Declaration.removeAll((err, data) => {
		if (err) res.status(500).send({
			message: err.message || "Some error ocurred while removing data."
		});
		else res.send({
			message: `All data were deleted successfully!`
		});
	});
}