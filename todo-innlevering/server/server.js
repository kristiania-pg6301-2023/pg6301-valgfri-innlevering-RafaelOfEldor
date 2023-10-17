import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.static("../client/dist"));
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);

export const goalsApi = express.Router();


const url = "mongodb+srv://letrix7:D3tV4r3Ng4Ng@cluster0.ps27mqb.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);

client.connect().then((connection) => {
  
  app.get("/api/tasks", async (req, res) => {
    const goals = await connection
    .db("todo-list")
    .collection("goals")
    .find()
    .toArray();
  res.json(goals)
  });

  app.put("/api/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { goal } = req.body;
    await connection
    .db("todo-list")
    .collection("goals")
    .updateOne({id: id}, {$set: {goal: goal}}, {returnDocument: true})
  res.end();
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await connection
    .db("todo-list")
    .collection("goals")
    .deleteOne({id: id})
  res.end();
  });

  app.post("/api/tasks", async (req, res) => {
    await connection
    .db("todo-list")
    .collection("goals")
    .insertOne(req.body)
  res.end();
  });  
})

goalsApi.get("/api/tasks", async (req, res) => {
  const goals = await client
    .db("todo-list")
    .collection("test-goals")
    .find()
    .toArray();
  res.json(goals)
});

goalsApi.put("/api/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { goal } = req.body;
  await client
  .db("todo-list")
  .collection("test-goals")
  .updateOne({id: id}, {$set: {goal: goal}}, {returnDocument: true})
res.sendStatus(204)
res.end();
});

goalsApi.delete("/api/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await client
  .db("todo-list")
  .collection("test-goals")
  .deleteOne({id: id})
res.sendStatus(204)
res.end();
});

goalsApi.post("/api/tasks", async (req, res) => {
  await client
  .db("todo-list")
  .collection("test-goals")
  .insertOne(req.body)
res.sendStatus(204)
res.end();
});
