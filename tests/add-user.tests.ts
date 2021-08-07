import {server} from "../src/server";
import request from "supertest";
import mongoose from 'mongoose';

describe("User Test Cases", () => {
  it("Get All the users", async () => {
    const result = await request(server).get("/users");
    expect(result.statusCode).toBe(200);
    expect(result.body.length).toBeGreaterThan(0);
  });
  it("Return 400 on invalid input details For user", async () => {
      const errorResult = await request(server).post("/users").send({});
      expect(errorResult.statusCode).toBe(400);
  })
});
afterAll(done => {
    mongoose.connection.close()
    server.close();
    done()
  })