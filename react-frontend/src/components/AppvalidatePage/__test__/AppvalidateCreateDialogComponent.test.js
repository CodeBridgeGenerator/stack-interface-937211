import React from "react";
import { render, screen } from "@testing-library/react";

import AppvalidateCreateDialogComponent from "../AppvalidateCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders appvalidate create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AppvalidateCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("appvalidate-create-dialog-component")).toBeInTheDocument();
});
