const request = require("supertest");

const baseURL = "http://localhost:5000";

let user_id;

beforeEach(async () => {
  req = request(baseURL);
});

beforeAll(async () => {
  user = {
    name: "in memory user",
    email: "memory@gmail.com",
    password: "123",
    phone: "9999999",
    blood_type: "O+",
    flag_chat: "T",
    gender: "F"
  };

  const response = await req.post("/register").send(user);

  expect(response.status).toBe(200);
});

describe("solicitations successfull CRUD", () => {
 
  test("returns the created user", async () => {
  })
  
  test("creates 5 solicitations in a row", () => {

  })

  test("gets user feed with city", () => {

  })

  test("gets user feed with different city", () => {

  })

  test("gets user feed with city without bloodtype", () => {

  })
  
  test("gets user feed without city", () => {
    
  })

});
