import React from "react";
import { render, screen } from "@testing-library/react";

import StackschemaEditDialogComponent from "../StackschemaEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stackschema edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StackschemaEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stackschema-edit-dialog-component")).toBeInTheDocument();
});
