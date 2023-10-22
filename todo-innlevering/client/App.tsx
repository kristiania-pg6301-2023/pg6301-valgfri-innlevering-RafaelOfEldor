import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import TodoApplication from "./TodoApplication";

const root = ReactDOM.createRoot(document.getElementById("root")!);

function App() {
  return (
    <HashRouter>
      <TodoApplication />
    </HashRouter>
  );
}

root.render(<App />);
