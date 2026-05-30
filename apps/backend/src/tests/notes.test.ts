import request from "supertest";

import app from "../app";

let token = "";

describe("Notes API", () => {
  const email = `notes${Date.now()}@example.com`;

  beforeAll(async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Notes User",
        email,
        password: "123456",
      });

    const loginResponse =
      await request(app)
        .post("/api/auth/login")
        .send({
          email,
          password: "123456",
        });

    token =
      loginResponse.body.data.token;
  });

  it("should create a note", async () => {
    const response = await request(app)
      .post("/api/notes")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        title: "Test Note",
        content: "Encrypted Content",
      });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(
      true
    );
  });

  it("should fetch notes", async () => {
    const response = await request(app)
      .get("/api/notes")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect(response.status).toBe(200);

    expect(
      Array.isArray(
        response.body.data
      )
    ).toBe(true);
  });

  it("should reject unauthorized access", async () => {
    const response = await request(app)
      .get("/api/notes");

    expect(response.status).toBe(401);
  });
});