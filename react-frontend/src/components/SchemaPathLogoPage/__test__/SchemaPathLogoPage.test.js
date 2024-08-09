import React from "react";
import { render, screen } from "@testing-library/react";

import SchemaPathLogoPage from "../SchemaPathLogoPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders schemaPathLogo page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SchemaPathLogoPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("schemaPathLogo-datatable")).toBeInTheDocument();
    expect(screen.getByRole("schemaPathLogo-add-button")).toBeInTheDocument();
});
