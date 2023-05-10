const request = require("supertest");

const baseURL = "http://localhost:5000";

let user_id;
let solicitation;
let solicitation_id;

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

  let response = await req.post("/register").send(user);

  if (response.status != 200) console.log('[BeforeAll] Não foi criado o usuário');
  else{
    response = await req.get("/user");
    if (!response.body.data) console.log('[BeforeAll] Não foi retornado o usuário');
    else{
      user_id = response.body.data[0].id;
    }
  }

}, 10000);

describe("solicitations successfull CRUD scenarios", () => {

  test("creates a solicitation", async () => {
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
  
  test("get created solicitation", async () => {
    const response = await req.get("/solicitations").query({ userId: user_id });
    solicitation_id = response.body.data[0].id
    
    expect(response.status).toBe(200);
    expect(response.body.data[0].status).toBe("open");
    expect(response.body.data[0].solicitationUserId).toBe(user_id);
    expect(response.body.data[0].person.name).toBe(solicitation.name);
    expect(response.body.data[0].person.bloodtype).toBe(solicitation.bloodtype);
    expect(response.body.data[0].person.description).toBe(solicitation.description);
    expect(response.body.data[0].person.age).toBe(solicitation.age);
    expect(response.body.data[0].person.city).toBe(solicitation.city);
    expect(response.body.data[0].person.state).toBe(solicitation.state);
    expect(response.body.data[0].person.hospital).toBe(solicitation.hospital);
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
  })
  
  test("get updated solicitation", async () => {
    const response = await req.get("/solicitations").query({ userId: user_id });
    
    expect(response.status).toBe(200); 

    expect(response.body.data[0].status).toBe("open");
    expect(response.body.data[0].solicitationUserId).toBe(user_id);
    expect(response.body.data[0].closure_date).toBe(null);
    expect(response.body.data[0].person.name).toBe(solicitation.name);
    expect(response.body.data[0].person.bloodtype).toBe(solicitation.bloodtype);
    expect(response.body.data[0].person.description).toBe(solicitation.description);
    expect(response.body.data[0].person.age).toBe(solicitation.age);
    expect(response.body.data[0].person.city).toBe("Maceio");
    expect(response.body.data[0].person.state).toBe("Alagoas");
    expect(response.body.data[0].person.hospital).toBe(solicitation.hospital);
  })

  test("disables a solicitation", async () => {
    const response = await req.put("/solicitations/"+solicitation_id);
    expect(response.status).toBe(200); 
  })


  test("disabled solicitation is not returned in /get", async () => {
    const response = await req.get("/solicitations").query({ id: solicitation_id });
    expect(response.status).toBe(200); 
    expect(response.body.data).toBe(null); 
  })
});
