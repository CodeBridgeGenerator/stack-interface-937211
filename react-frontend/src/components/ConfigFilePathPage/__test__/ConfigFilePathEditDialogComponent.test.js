import React from "react";
import { render, screen } from "@testing-library/react";

import ConfigFilePathEditDialogComponent from "../ConfigFilePathEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders configFilePath edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ConfigFilePathEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("configFilePath-edit-dialog-component")).toBeInTheDocument();
});
