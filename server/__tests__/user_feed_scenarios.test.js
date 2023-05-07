const request = require("supertest");

const baseURL = "http://localhost:5000";

let user_id;

beforeEach(async () => {
  req = request(baseURL);
});

describe("solicitations successfull CRUD", () => {
 
  test("returns the created user", async () => {
    const response = await req.get("/user");
    user_id = response.body.data[0].id;

    expect(response.status).toBe(200);
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
