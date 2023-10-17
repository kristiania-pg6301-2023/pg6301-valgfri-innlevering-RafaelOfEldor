import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.static("../client/dist"));
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);

export const goalsApi = express.Router();

// let TASKS = [
//   {
//     id: 1,
//     goal: "Example goal #1",
//   }
// ];


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

  // goalsApi.get("/api/tasks", async (req, res) => {
  //   console.log("im here")
  //   const goals = await connection
  //     .db("todo-list")
  //     .collection("test-goals")
  //     .find()
  //     .toArray();
  //   res.json(goals)
  // });
  
  
})

goalsApi.get("/api/tasks", async (req, res) => {
  console.log("im here")
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

// app.put("/api/tasks/:id", async (req, res) => {
//   console.log("hii")
//   const id = parseInt(req.params.id);
//   const { goal } = req.body;
//   await connection
//   .db("todo-list")
//   .collection("goals")
//   .findOneAndUpdate({id: id}, {goal: goal}, (error, data) => {
//     if(error){
//       console.log(error)
//     } else {
//       console.log(data)
//     }
//   })
// // console.log(goals)
// // res.json(goals)
// res.end();
// });

// app.put("/api/tasks/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const { goal } = req.body;
//   TASKS.find((item) => item.id === id).goal = goal;

//   res.end();
// });

// app.delete("/api/tasks/:id", (req, res) => {
//   const elementId = parseInt(req.params.id);
//   TASKS = TASKS.filter(({ id }) => id !== elementId);
//   res.end();
// });

// app.post("/api/tasks", (req, res) => {
//   console.log("im here");
//   TASKS.push(req.body);
//   res.end();
// });

// goalsApi.get("/api/tasks", (req, res) => {
//   console.log("im here")
//   res.json(TASKS);
// });

// goalsApi.put("/api/tasks/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const { goal } = req.body;
//   TASKS.find((item) => item.id === id).goal = goal;
//   res.sendStatus(204);
//   res.end();
// });

// goalsApi.delete("/api/tasks/:id", (req, res) => {
//   const elementId = parseInt(req.params.id);
//   TASKS = TASKS.filter(({ id }) => id !== elementId);
// });

// goalsApi.post("/api/tasks", (req, res) => {
//   TASKS.push(req.body);
//   res.sendStatus(204);
//   res.end();
// });
