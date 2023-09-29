module.exports = (app) => {
	const people = require("../controllers/person.controller.js");

	var router = require("express").Router();

	// Create a new Person
	router.post("/", people.create);

	// Retrive all data
	router.get("/", people.findAll);

	// Retrieve all data have conacts to COVID-19 patients
	router.get("/have_contacts", people.findAllHaveContacts);

	// Retrieve a Person with id
  router.get("/:id", people.findOne);

  // Update a Person with id
  router.put("/:id", people.update);

  // Delete a Person with id
  router.delete("/:id", people.delete);

  // Delete all data
  router.delete("/", people.deleteAll);

  app.use('/api/people', router);
};