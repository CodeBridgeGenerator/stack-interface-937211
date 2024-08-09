import React from "react";
import { render, screen } from "@testing-library/react";

import SchemaGenTempPage from "../SchemaGenTempPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders schemaGenTemp page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SchemaGenTempPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("schemaGenTemp-datatable")).toBeInTheDocument();
    expect(screen.getByRole("schemaGenTemp-add-button")).toBeInTheDocument();
});
