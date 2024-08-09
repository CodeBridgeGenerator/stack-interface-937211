import React from "react";
import { render, screen } from "@testing-library/react";

import SchemaPage from "../SchemaPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders schema page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SchemaPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("schema-datatable")).toBeInTheDocument();
    expect(screen.getByRole("schema-add-button")).toBeInTheDocument();
});
