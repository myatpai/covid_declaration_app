import http from "../http-common";

class DeclarationDataService {
	getAll() {
    return http.get("/declaration");
  }

  get(id) {
    return http.get(`/declaration/${id}`);
  }

  create(data) {
    return http.post("/declaration", data);
  }
}

export default new DeclarationDataService();