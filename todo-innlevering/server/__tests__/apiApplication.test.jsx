import request from "supertest";
import express from "express";
import { goalsApi } from "../server.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(goalsApi);

let expectedJson = [
  {
    id: 1,
    goal: "Example goal #1",
  }
];

describe("Goals Api", () => {
  it("returns list of goals", async () => {
    await request(app).get("/api/tasks").expect(expectedJson);
  });

  it("can add a goal", async () => {
    const id = 2
    const goal = "My posted goal";
    await request(app).post("/api/tasks").send({ id, goal }).expect(204);
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body.map((m) => m.goal)).toContain(goal);
  });

  it("can replace a goal", async () => {
    const goal = "My updated goal";
    const id = "2";
    await request(app).put(`/api/tasks/${id}`).send({ goal }).expect(204);
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body.map((m) => m.goal)).toContain(goal);
  });
});
