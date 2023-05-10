const request = require("supertest");

const baseURL = "http://localhost:5000";
let user_id, registerId;

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

describe("donations successful CRUD scenarios", () => {
    test("creates a donation register", async () => {
        const register = {
            idUser: user_id,
            date: "09/05/2023",
            place: "lugar"
        };

        const response = await req.post("/donation-register").send(register);
        registerId = response.body.id;

        expect(response.status).toBe(200);
        expect(response.body.place).toBe(register.place);
        expect(response.body.date).toBe("2023-09-05");
    });

    
    test("updates a donation register", async () => {
        const register = {
            id: registerId,
            date: "08/03/2023",
            place: "lugar"
        };

        const response = await req.put("/donation-register").send(register);
        registerId = response.body.id;

        expect(response.status).toBe(200);
        expect(response.body.date).toBe("2023-03-08");
        expect(response.body.place).toBe(register.place);
    });


    test("delete a donation register", async() => {
        const response = await req.delete("/donation-register/"+registerId);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Deletado com sucesso");
    });

});