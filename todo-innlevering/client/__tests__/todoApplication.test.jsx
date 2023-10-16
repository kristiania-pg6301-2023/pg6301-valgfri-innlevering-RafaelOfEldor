import renderer, { act } from "react-test-renderer";
import React from "react";
import TodoApplication from "../TodoApplication.tsx";

import { MemoryRouter } from "react-router-dom";

describe("quiz application", () => {
  it("knows the answer to the question", () => {
    expect(6 * 9).toEqual(54);
  });

  // it("renders React", () => {
  //   const component = renderer.create(<h1>Hello world</h1>);
  //   expect(component).toMatchSnapshot();
  // });

  it("renders this project", () => {
    const component = renderer.create(<TodoApplication />);
    expect(component).toMatchSnapshot();
  });
});
