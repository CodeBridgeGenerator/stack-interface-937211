import React from "react";
import { render, screen } from "@testing-library/react";

import StackValidateCreateDialogComponent from "../StackValidateCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stackValidate create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StackValidateCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stackValidate-create-dialog-component")).toBeInTheDocument();
});
