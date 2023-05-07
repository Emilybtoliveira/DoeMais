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

  test("creates a solicitation", () => {

  })

  test("updates a solicitation", () => {
    
  })

  test("disables a solicitation", () => {
    
  })

  test("get a user's solicitations", () => {
    
  })

});
