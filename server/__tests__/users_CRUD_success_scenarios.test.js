const request = require("supertest");

const baseURL = "http://localhost:5000";

let user_id;
let user;

beforeAll(async () => {
  req = request(baseURL);
});

describe("users successfull CRUD", () => {
  test("user register", async () => {
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
    expect(response.body.message).toBe("Cadastro concluido, enviaremos um email para confirmaçao");

  }, 10000);

  test("returns the created user", async () => {
    const response = await req.get("/user");

    user = response.body.data[0];
    user_id = response.body.data[0].id;

    expect(response.status).toBe(200);
    expect(user.name).toBe("in memory user");
    expect(user.email).toBe("memory@gmail.com");
    expect(user.password).toBe("123");
    expect(user.phone).toBe("9999999");
    expect(user.donator.blood_type).toBe("O+");
    expect(user.donator.flag_chat).toBe("T");
    expect(user.donator.gender).toBe("F");
    expect(user.active).toBe(false);
  })

  test("updates the created user", async () => {
    user = {
      id: user_id,
      name: "in memory user updated",
      email: "memory_updated@gmail.com",
      flag_chat: "F",
    };

    const response = await req.put("/user").send(user);
    expect(response.status).toBe(200);

  })

  test("returns the updated user", async () => {
    const response = await req.get("/user/"+user_id);

    user = response.body.data;

    expect(response.status).toBe(200);
    expect(user.name).toBe("in memory user updated");
    expect(user.email).toBe("memory_updated@gmail.com");
    expect(user.phone).toBe("9999999");
    expect(user.donator.blood_type).toBe("O+");
    expect(user.donator.flag_chat).toBe("F");
    expect(user.donator.gender).toBe("F");  
  })

  test("deletes the created user", async() => {
    const response = await req.delete("/user/"+user_id);
    expect(response.status).toBe(200);
  })
});
