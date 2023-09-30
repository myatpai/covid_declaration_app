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

Declaration.getAllHaveContact = (result) => {
	sql.query("SELECT * FROM declarations WHERE has_contact=true", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("declarations: ", res);
		return(null, res);
	});
};

Declaration.updateById = (id, declaration, result) => {
	sql.query("UPDATE declarations SET name = ?, temperature = ?, symptom = ?, has_contact = ? WHERE id = ?", [declaration.name, declaration.temperature, declaration.symptom, declaration.has_contact], (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found Declaration with the id
			result({ kind: "not_found" }, null);
			return;
		}
		
		console.log("updated Declaration: ", { id: id, ...declaration });
		result(null, { id: id, ...declaration });
	});
};

Declaration.remove = (id, result) => {
	sql.query("DELETE FROM declarations WHERE id = ?", id, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (err.affectedRows == 0) {
			// not found Declaration with the id
			result({ kind: "not_found" }, null);
			return;
		}

		console.log("deleted Declaration with id: ", id);
		result(null, res);
	});
};

Declaration.removeAll = (result) => {
	sql.query("DELETE FROM declarations", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log(`deleted ${res.affectedRows} declarations`);
		result(null, res);
	});
};

module.exports = Declaration;