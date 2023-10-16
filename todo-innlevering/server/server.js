import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(express.static("../client/dist"));
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);

export const goalsApi = express.Router();

let TASKS = [
  {
    id: 1,
    goal: "Example goal #1",
  }
];

app.get("/api/tasks", (req, res) => {
  res.json(TASKS);
});

app.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { goal } = req.body;
  TASKS.find((item) => item.id === id).goal = goal;

  res.end();
});

app.delete("/api/tasks/:id", (req, res) => {
  const elementId = parseInt(req.params.id);
  TASKS = TASKS.filter(({ id }) => id !== elementId);
  res.end();
});

app.post("/api/tasks", (req, res) => {
  console.log("im here");
  TASKS.push(req.body);
  res.end();
});

goalsApi.get("/api/tasks", (req, res) => {
  res.json(TASKS);
});

goalsApi.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { goal } = req.body;
  TASKS.find((item) => item.id === id).goal = goal;
  res.sendStatus(204);
  res.end();
});

goalsApi.delete("/api/tasks/:id", (req, res) => {
  const elementId = parseInt(req.params.id);
  TASKS = TASKS.filter(({ id }) => id !== elementId);
});

goalsApi.post("/api/tasks", (req, res) => {
  TASKS.push(req.body);
  res.sendStatus(204);
  res.end();
});
