import React from "react";

export async function ExpressPost(elementData: any) {
  await fetch("/api/tasks", {
    method: "POST",
    body: JSON.stringify(elementData),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function ExpressDelete(elementId: string) {
  await fetch(`/api/tasks/${elementId}`, {
    method: "DELETE",
  });
}

export async function ExpressPut(elementGoal: string, elementId: string) {
  await fetch(`/api/tasks/${elementId}`, {
    method: "PUT",
    body: JSON.stringify({
      goal: elementGoal,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}
