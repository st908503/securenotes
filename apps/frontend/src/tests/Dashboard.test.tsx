import {
  render,
  screen,
} from "@testing-library/react";

import Dashboard from "../pages/Dashboard";

import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import { store } from "../app/store";

describe("Dashboard Page", () => {
  it("renders dashboard", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText(
        /secure notes/i
      )
    ).toBeInTheDocument();
  });
});