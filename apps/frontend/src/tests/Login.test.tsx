import {
  render,
  screen,
} from "@testing-library/react";

import {
  Provider,
} from "react-redux";

import {
  BrowserRouter,
} from "react-router-dom";

import Login from "../pages/Login";

import { store } from "../app/store";

describe(
  "Login Page",

  () => {
    it(
      "renders login form",

      () => {
        render(
          <Provider
            store={store}
          >
            <BrowserRouter>
              <Login />
            </BrowserRouter>
          </Provider>
        );

        expect(
          screen.getByText(
            /secure notes/i
          )
        ).toBeInTheDocument();

        expect(
          screen.getByLabelText(
            /email/i
          )
        ).toBeInTheDocument();

        expect(
          screen.getByLabelText(
            /password/i
          )
        ).toBeInTheDocument();

        expect(
          screen.getAllByRole(
            "button",
            {
              name: /login/i,
            }
          ).length
        ).toBeGreaterThan(0);
      }
    );
  }
);