import http from "./http_common";

const getQue = () => {
  return http.get("questions?page=1&limit=20&term=&topic=");
};


const getTopic = () => {
    return http.get("topics?page=1&limit=9007199254740991&term=");
  };

const get = id => {
  return http.get(`/tutorials/${id}`);
};

const create = data => {
  return http.post("/tutorials", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = id => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};

export default {
  getQue,
  getTopic,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};