import React from "react";
import { render, screen } from "@testing-library/react";

import ConfigFilePathCreateDialogComponent from "../ConfigFilePathCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders configFilePath create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ConfigFilePathCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("configFilePath-create-dialog-component")).toBeInTheDocument();
});
