const request = require("supertest");

const app = require("../../server");

describe("POST/users/login", () => {
  beforeAll(() => {
    console.log("before all");
  });

  beforeEach(() => {
    console.log("before each");
  });

  afterEach(() => {
    console.log("after each");
  });

  afterAll(() => {
    console.log("after all");
  });

  it("should return user object and jwt", async () => {
    const testData = {
      email: "sveta@gmail.com",
      password: "12345678",
    };

    const res = await request(app).post("/users/login").send(testData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: {
          email: expect.any(String),
          subscription: expect.any(String),
        },
      })
    );
  });

  it("should return unauth error", async () => {
    const testData = {
      email: "svetaP@gmail.com",
      password: "12345678",
    };

    const res = await request(app).post("/users/login").send(testData);

    expect(res.statusCode).toBe(401);
  });

  it("should return unauth error", async () => {
    const testData = {
      email: "sveta@gmail.com",
    };

    const res = await request(app).post("/users/login").send(testData);

    expect(res.statusCode).toBe(400);
  });
});
