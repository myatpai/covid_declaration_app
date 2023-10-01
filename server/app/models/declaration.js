const sql = require("./db.js");

// constructor
// Name, Temperature, Do you have any of the following symptoms now or within the last 14 days: Cough, smell/test impairment, fever, breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhea, runny nose(even if your symptoms are mild)?, Have you been in contact with anyone who is suspected to have/ has been diagnosed with Covid-19 within the last 14 days?
const Declaration = function(declaration) {
	this.name = declaration.name;
	this.temperature = declaration.temperature;
	this.symptoms = declaration.symptoms;
	this.has_contact = declaration.has_contact;
};

Declaration.create = (newDeclaration, result) => {
	console.log("newDec", newDeclaration);
	sql.query("INSERT INTO declarations SET ?", newDeclaration, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created Declaration: ", {id: res.insertId, ...newDeclaration});
		result(null, { id: res.insertId, ...newDeclaration });
	});
};

Declaration.findById = (id, result) => {
	sql.query(`SELECT * FROM declarations WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log("found declaration: ", res[0]);
			result(null, res[0]);
			return;
		}

		// not found Declaration with the id
		result({ kind: "not_found" }, null);
	});
};

Declaration.getAll = (name, result) => {
	let query = "SELECT * FROM declarations";

	if (name) {
		query += ` WHERE name = ${name}`;
	}

	sql.query(query, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("declarations: ", res);
		result(null, res);
	});
};

module.exports = Declaration;