import React, { useRef } from "react";
import { ExpressPost, ExpressPut, ExpressDelete } from "./ExpressFunctions";

interface GoalsProps {
  id: number;
  goals: string;
  onRefresh: () => Promise<void>;
}
export default function ListElements(props: GoalsProps) {
  const [showEdit, setShowEdit] = React.useState(false);
  const inputRef = useRef(null);

  async function handleEdit(e: React.ChangeEvent<HTMLFormElement>) {
    ExpressPut(e.target.editText.value, props.id.toString());
    console.log(e.target.editText.value, props.id);
  }

  async function handleDelete() {
    location.reload();
    ExpressDelete(props.id.toString());
  }

  return (
    <div>
      <div className="list-element-div">
        <li>{props.goals}</li>
        <button onClick={() => setShowEdit((prev) => !prev)}>
          {showEdit ? "Hide Edit" : "Edit"}
        </button>
        <button onClick={handleDelete}> Delete</button>
      </div>
      {showEdit && (
        <form onSubmit={handleEdit} className="show-edit-div">
          <input placeholder="change here" name="editText" ref={inputRef} />
          <button> Submit Change </button>
        </form>
      )}
    </div>
  );
}
