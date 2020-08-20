const request = require("supertest");
const server = require("./server");
const db = require("../data/db-config");

describe("server", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST /users", () => {
    it("posts a new user", async () => {
      let res = await request(server).get("/users");

      expect(res.body.users).toHaveLength(0);

      await request(server).post("/users").send({ name: "Christian" });

      res = await request(server).get("/users");

      expect(res.body.users).toHaveLength(1);
    });

    it("doesn't add user if req.body is empty", async () => {
      let res = await request(server).get("/users");

      expect(res.body.users).toHaveLength(0);

      await request(server).post("/users").send({});

      res = await request(server).get("/users");

      expect(res.body.users).toHaveLength(0);
    });
  });

  describe("DELETE /users/:id", () => {
    it("deletes a user", async () => {
      let res = await request(server).get("/users");
      expect(res.body.users).toHaveLength(0);

      await request(server).post("/users").send({ name: "Christian" });
      res = await request(server).get("/users");
      expect(res.body.users).toHaveLength(1);

      await request(server).delete("/users/1");

      res = await request(server).get("/users");
      expect(res.body.users).toHaveLength(0);
    });

    it("does not delete anything when the user id does not exist", async () => {
      let res = await request(server).get("/users");
      expect(res.body.users).toHaveLength(0);

      await request(server).post("/users").send({ name: "Christian" });
      res = await request(server).get("/users");
      expect(res.body.users).toHaveLength(1);

      await request(server).delete("/users/2");

      res = await request(server).get("/users");
      expect(res.body.users).toHaveLength(1);
    });
  });
});
