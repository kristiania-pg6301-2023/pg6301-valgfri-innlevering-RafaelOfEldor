import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import ListElements from "./ListElements";
import { ExpressPost } from "./ExpressFunctions";

interface ListElementsitem {
  goal: string;
  id: number;
}

export default function TodoApplication() {
  const [goals, setGoals] = useState<ListElementsitem[]>([]);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setGoals(await res.json());
  }

  console.log(goals);
  useEffect(() => {
    loadTasks();
  }, []);

  const goalsElement = goals.map((item: ListElementsitem) => {
    return (
      <ListElements goals={item.goal} id={item.id} onRefresh={loadTasks} />
    );
  });

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    // e.preventDefault();
    let newElement = {
      id: goals.length + 1,
      goal: e.target.addTask.value,
    };
    console.log(newElement);
    ExpressPost(newElement);
  }

  return (
    <div style={{ marginTop: "200px" }}>
      <div className="title-div">
        <h1>Todo list</h1>
        <form
          style={{
            display: "flex",
            maxWidth: "50vw",
            justifyContent: "center",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <input
            placeholder="--> Type task here <--"
            name="addTask"
            style={{ width: "200px", height: "40px", display: "flex" }}
          />
          <button style={{ height: "40px", width: "100px" }}>
            Add to list
          </button>
        </form>
      </div>
      <ul className="goals-list">{goalsElement}</ul>
    </div>
  );
}
