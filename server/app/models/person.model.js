const sql = require("./db.js");

// constructor
// Name, Temperature, Do you have any of the following symptoms now or within the last 14 days: Cough, smell/test impairment, fever, breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhea, runny nose(even if your symptoms are mild)?, Have you been in contact with anyone who is suspected to have/ has been diagnosed with Covid-19 within the last 14 days?
const Person = (person) => {
	this.name = person.name;
	this.temperature = person.temperature;
	this.symptom = person,symptom;
	this.have_contact = person.have_contact;
};

Person.create = (newPerson, result) => {
	sql.query("INSERT INTO persons SET ?", newPerson, (err, res) => {
		if (err) {
			console.log("create error: ", err);
			result(err, null);
			return;
		}

		console.log("created person: ", {id: res.insertId, ...newPerson});
		result(null, { id: res.insertId, ...newPerson });
	});
};

Person.findById = (id, result) => {
	sql.query(`SELECT * FROM persons WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log("findById error: ", err);
			result(err, null);
			return;
		}

		// not found Person with the id
		result({ kind: "not_found" }, null);
	});
};

Person.getAll = (name, result) => {
	let query = "SELECT * FROM persons";

	if (name) {
		query += ` WHERE name = ${name}`;
	}

	sql.query(query, (err, res) => {
		if (err) {
			console.log('getAll error: ', err);
			result(null, err);
			return;
		}

		console.log("persons: ", res);
		result(null, res);
	});
};

Person.updateById = (id, person, result) => {
	sql.query("UPDATE persons SET name = ?, temperature = ?, symptom = ?, have_contact = ? WHERE id = ?", [person.name, person.temperature, person.symptom, person.have_contact], (err, res) => {
		if (err) {
			console.log("updateById error: ", err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found Person with the id
			result({ kind: "not_found" }, null);
			return;
		}
		
		console.log("updated person: ", { id: id, ...person });
		result(null, { id: id, ...person });
	});
};

Person.remove = (id, result) => {
	sql.query("DELETE FROM persons WHERE id = ?", id, (err, res) => {
		if (err) {
			console.log("remove error: ", err);
			result(null, err);
			return;
		}

		if (err.affectedRows == 0) {
			// not found Person with the id
			result({ kind: "not_found" }, null);
			return;
		}

		console.log("deleted person with id: ", id);
		result(null, res);
	});
};

Person.removeAll = (result) => {
	sql.query("DELETE FROM persons", (err, res) => {
		if (err) {
			console.log("removeAll error: ", err);
			result(null, err);
			return;
		}

		console.log(`deleted ${res.affectedRows} persons`);
		result(null, res);
	});
};

module.exports = Person;