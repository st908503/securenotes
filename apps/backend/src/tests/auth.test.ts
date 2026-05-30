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

    expect(
      response.body.data
        .accessToken
    ).toBeDefined();

    expect(
      response.headers[
        "set-cookie"
      ]
    ).toBeDefined();
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
      response.body.data
        .accessToken
    ).toBeDefined();

    expect(
      response.headers[
        "set-cookie"
      ]
    ).toBeDefined();
  });

  it("should refresh access token", async () => {
    const loginResponse =
      await request(app)
        .post("/api/auth/login")
        .send({
          email,
          password: "123456",
        });

    const cookies =
      loginResponse.headers[
        "set-cookie"
      ];

    const response =
      await request(app)
        .post(
          "/api/auth/refresh-token"
        )
        .set(
          "Cookie",
          cookies
        );

    expect(response.status).toBe(
      200
    );

    expect(
      response.body.data
        .accessToken
    ).toBeDefined();
  });

  it("should logout user", async () => {
    const response =
      await request(app).post(
        "/api/auth/logout"
      );

    expect(response.status).toBe(
      200
    );

    expect(response.body.success).toBe(
      true
    );
  });

  it("should fail with invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email:
          "wrong@example.com",

        password:
          "wrongpassword",
      });

    expect(response.status).toBe(
      401
    );
  });

  it("should fail refresh token without cookie", async () => {
    const response =
      await request(app).post(
        "/api/auth/refresh-token"
      );

    expect(response.status).toBe(
      401
    );
  });
});