import React from "react";
import { render, screen } from "@testing-library/react";

import SchemaPathLogoCreateDialogComponent from "../SchemaPathLogoCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders schemaPathLogo create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SchemaPathLogoCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("schemaPathLogo-create-dialog-component")).toBeInTheDocument();
});
