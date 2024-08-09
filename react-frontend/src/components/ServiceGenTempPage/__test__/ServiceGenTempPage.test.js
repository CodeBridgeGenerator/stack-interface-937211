import React from "react";
import { render, screen } from "@testing-library/react";

import ServiceGenTempPage from "../ServiceGenTempPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders serviceGenTemp page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceGenTempPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("serviceGenTemp-datatable")).toBeInTheDocument();
    expect(screen.getByRole("serviceGenTemp-add-button")).toBeInTheDocument();
});
