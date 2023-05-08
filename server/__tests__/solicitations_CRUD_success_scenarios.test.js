const request = require("supertest");

const baseURL = "http://localhost:5000";

let user_id;
let solicitation;

beforeAll(async () => {
  req = request(baseURL);

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

/* beforeEach(async () => {
  req = request(baseURL);
}); */

describe("solicitations successfull CRUD", () => {
  test.only("returns the created user", async () => {
    const response = await req.get("/user");
    user_id = response.body.data[0].id;

    expect(response.status).toBe(200);
  })

  test.only("creates a solicitation", async () => {
    solicitation = {
      userId: user_id,
      name: "Pessoa solicitante",
      bloodtype: "O+",
      description: "",
      picture: null,
      age: 34,
      city: "Maceio",
      state: "Alagoas",
      hospital: null
    };

    const response = await req.post("/solicitations").send(solicitation);

    expect(response.status).toBe(200);
  })
  
  test.only("get created solicitation", async () => {
    const response = await req.get("/solicitations").query({ userId: user_id });
    expect(response.status).toBe(200);
    console.log(response.body);
  })

  test("updates a solicitation", async () => {
    solicitation = {
      id: user_id,
      name: "Pessoa solicitante edit",
      bloodtype: "O-",
      description: "adicionando descrição",
      age: 35,
      hospital: "adicionando hospital"
    };

    const response = await req.put("/solicitations").send(solicitation);

    expect(response.status).toBe(200);
    console.log(response.body);
  })

  test("disables a solicitation", async () => {
   // const response = await req.get("/solicitations/"+user_id).send(solicitation);

  })

  test("get a user's solicitations", async () => {

  })

});
