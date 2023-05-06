
const { Sequelize } = require("sequelize");
const request = require("supertest");

const baseURL = "http://localhost:5000";

/* const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});


beforeAll(async () => {
  await sequelize.sync({ force: true });
}); */

beforeEach(async () => {
  req = request(baseURL);
});

describe("user controller", () => {

  describe("get users", () => {
    test("should create a user", async () => {
      const user = {
        name: "in memory user",
        email: "memory@gmail.com",
        password: "123",
        phone: "",
        blood_type: "",
        flag_chat: "T",
        gender: "F"
      };
      const response = await req.post("/register").send(user);
      console.log(response.body);
      expect(response.status).toBe(200);
    }, 10000); 

    test("should return the created user", async () => {
      const response = await req.get("/user");
      console.log(response.body);
      expect(response.status).toBe(200);
    })
  });

  
});
