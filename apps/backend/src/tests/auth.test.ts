import request from "supertest";

import app from "../app";

describe("Auth API", () => {
  const email = `test${Date.now()}@example.com`;

  it("should register a user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email,
        password: "123456",
      });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(
      true
    );
  });

  it("should login a user", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email,
        password: "123456",
      });

    expect(response.status).toBe(200);

    expect(
      response.body.data.token
    ).toBeDefined();
  });

  it("should fail with invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@example.com",
        password: "wrongpassword",
      });

    expect(response.status).toBe(401);
  });
});