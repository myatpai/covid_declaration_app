module.exports = (app) => {
	const declaration = require("../controllers/declaration.js");

	var router = require("express").Router();

	// Create a new Declaration
	router.post("/", declaration.create);

	// Retrive all data
	router.get("/", declaration.findAll);
	
	app.use('/api/declaration', router);
};