import React from "react";
import { render, screen } from "@testing-library/react";

import SchemaPathLogoEditDialogComponent from "../SchemaPathLogoEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders schemaPathLogo edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SchemaPathLogoEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("schemaPathLogo-edit-dialog-component")).toBeInTheDocument();
});
