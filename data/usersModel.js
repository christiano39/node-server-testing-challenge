const db = require("./db-config");

module.exports = {
  get,
  insert,
  remove,
};

function get() {
  return db("users");
}

function insert(user) {
  return db("users")
    .insert(user, "id")
    .then((ids) => ids[0]);
}

function remove(id) {
  return db("users").where({ id }).del();
}
