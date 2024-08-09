import React from "react";
import { render, screen } from "@testing-library/react";

import AppGenTempPage from "../AppGenTempPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders appGenTemp page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AppGenTempPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("appGenTemp-datatable")).toBeInTheDocument();
    expect(screen.getByRole("appGenTemp-add-button")).toBeInTheDocument();
});
