import React from "react";
import { render, screen } from "@testing-library/react";

import StackValidateEditDialogComponent from "../StackValidateEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stackValidate edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StackValidateEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stackValidate-edit-dialog-component")).toBeInTheDocument();
});
