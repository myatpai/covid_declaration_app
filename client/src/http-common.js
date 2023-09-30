import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:8080/api",
	headers: {
		"Access-Control-Allow-Origin": "*",
    	"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		"Access-Control-Allow-Headers": "x-access-token, Origin, X-Requested-With, Content-Type, Accept",
		"Content-type": "application/json",
	}
})