const request = require("supertest");

const baseURL = "http://localhost:5000";
let user_id;

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
  else {
    response = await req.get("/user");
    if (!response.body.data) console.log('[BeforeAll] Não foi retornado o usuário');
    else {
      user_id = response.body.data[0].id;
    }
  }

}, 10000);

describe("solicitations successfull CRUD", () => {
  test("creates 5 solicitations in a row", async () => {
    const bloodtypes = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
    let random_bloodtype, number;
    let response;

    for (let i = 0; i < 5; i++) {
      random_bloodtype = bloodtypes[Math.floor(Math.random() * bloodtypes.length)];
      number = Math.floor(Math.random() * 90)

      solicitation = {
        userId: user_id,
        name: "Pessoa solicitante " + i,
        bloodtype: random_bloodtype,
        description: "",
        picture: null,
        age: number,
        city: "Maceio",
        state: "Alagoas",
        hospital: null
      };

      response = await req.post("/solicitations").send(solicitation);
      console.log(solicitation);
      expect(response.status).toBe(200);
    }
  }, 10000)

  test("gets user feed with city", async () => {
    const compatibilyOpos = ["A+", "B+", "O+", "AB+"];
    

    const response = await req.get("/solicitations/feed").query({ userId: user_id, city: "Maceio" });
    expect(response.status).toBe(200);

    response.body.data.forEach(solicitation => {
      expect(solicitation.Solicitation.status).toBe("open");
      expect(solicitation.Solicitation.closure_date).toBeNull();
      expect(solicitation.name).not.toBeNull();
      expect(solicitation.age).not.toBeNull();
      expect(solicitation.city).not.toBeNull();
      expect(solicitation.state).not.toBeNull();
      expect(solicitation.state).not.toBeNull();

      expect(compatibilyOpos).toEqual(expect.arrayContaining([solicitation.bloodtype]));
    });

  })

  test("gets user feed with different city", async () => {

  })

  test("gets user feed with city without bloodtype", async () => {

  })

  test("gets user feed without city", async () => {

  })

});
