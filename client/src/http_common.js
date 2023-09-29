import axios from "axios";

export default axios.creat({
	baseURL: "http://localhost:8080/api",
	headers: {
		"Content-type": "application/json"
	}
});