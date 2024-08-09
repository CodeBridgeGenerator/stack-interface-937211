import React from "react";
import { render, screen } from "@testing-library/react";

import SchemaGenTempCreateDialogComponent from "../SchemaGenTempCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders schemaGenTemp create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SchemaGenTempCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("schemaGenTemp-create-dialog-component")).toBeInTheDocument();
});
