module.exports = (app) => {
	const declaration = require("../controllers/declaration.js");

	var router = require("express").Router();

	// Create a new Declaration
	router.post("/", declaration.create);

	// Retrive all data
	router.get("/", declaration.findAll);

	// Retrieve all data have conacts to COVID-19 patients
	router.get("/have_contact", declaration.findAllHaveContact);

	// Retrieve a Declaration with id
  	router.get("/:id", declaration.findOne);

	// Update a Declaration with id
	router.put("/:id", declaration.update);

	// Delete a Declaration with id
	router.delete("/:id", declaration.delete);

	// Delete all data
	router.delete("/", declaration.deleteAll);

	app.use('/api/declaration', router);
};