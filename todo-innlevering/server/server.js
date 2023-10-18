import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static("../client/dist"));
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Running on http://localhost:${server.address().port}`);
});

export const goalsApi = express.Router();
export const testGoalsApi = express.Router();

app.use(goalsApi);

const client = new MongoClient(process.env.MONGODB_URL);

client.connect().then(async (connection) => {
  goalsApi.get("/api/tasks", async (req, res) => {
    try {
      const goals = await connection
        .db("todo-list")
        .collection("goals")
        .find()
        .toArray();
      res.json(goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
      res.status(500).json({ error: "Failed to fetch goals" });
    }
  });

  goalsApi.put("/api/tasks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { goal } = req.body;
      await connection
        .db("todo-list")
        .collection("goals")
        .updateOne(
          { id: id },
          { $set: { goal: goal } },
          { returnDocument: true },
        );
      res.sendStatus(204);
    } catch (error) {
      console.error("Error updating goal:", error);
      res.status(500).json({ error: "Failed to update goal" });
    }
    res.end();
  });

  goalsApi.delete("/api/tasks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await connection
        .db("todo-list")
        .collection("goals")
        .deleteOne({ id: id });
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting goal:", error);
      res.status(500).json({ error: "Failed to delete goal" });
    }
    res.end();
  });

  goalsApi.post("/api/tasks", async (req, res) => {
    try {
      await connection.db("todo-list").collection("goals").insertOne(req.body);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error creating goal:", error);
      res.status(500).json({ error: "Failed to create goal" });
    }
    res.end();
  });
});

testGoalsApi.get("/api/tasks", async (req, res) => {
  const goals = await client
    .db("todo-list")
    .collection("test-goals")
    .find()
    .toArray();
  res.json(goals);
});

testGoalsApi.put("/api/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { goal } = req.body;
  await client
    .db("todo-list")
    .collection("test-goals")
    .updateOne({ id: id }, { $set: { goal: goal } }, { returnDocument: true });
  res.sendStatus(204);
  res.end();
});

testGoalsApi.delete("/api/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await client.db("todo-list").collection("test-goals").deleteOne({ id: id });
  res.sendStatus(204);
  res.end();
});

testGoalsApi.post("/api/tasks", async (req, res) => {
  await client.db("todo-list").collection("test-goals").insertOne(req.body);
  res.sendStatus(204);
  res.end();
});
