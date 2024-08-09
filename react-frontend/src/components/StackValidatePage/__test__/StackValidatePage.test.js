import React from "react";
import { render, screen } from "@testing-library/react";

import StackValidatePage from "../StackValidatePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stackValidate page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StackValidatePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stackValidate-datatable")).toBeInTheDocument();
    expect(screen.getByRole("stackValidate-add-button")).toBeInTheDocument();
});
