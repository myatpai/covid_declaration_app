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

  update(id, data) {
    return http.put(`/declaration/${id}`, data);
  }

  delete(id) {
    return http.delete(`/declaration/${id}`);
  }

  deleteAll() {
    return http.delete(`/declaration`);
  }

  findByTitle(name) {
    return http.get(`/declaration?name=${name}`);
  }
}

export default new DeclarationDataService();