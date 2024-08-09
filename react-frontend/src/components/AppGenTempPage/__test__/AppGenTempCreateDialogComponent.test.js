import React from "react";
import { render, screen } from "@testing-library/react";

import AppGenTempCreateDialogComponent from "../AppGenTempCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders appGenTemp create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AppGenTempCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("appGenTemp-create-dialog-component")).toBeInTheDocument();
});
