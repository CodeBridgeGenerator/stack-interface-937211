import React from "react";
import { render, screen } from "@testing-library/react";

import AppvalidateEditDialogComponent from "../AppvalidateEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders appvalidate edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AppvalidateEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("appvalidate-edit-dialog-component")).toBeInTheDocument();
});
