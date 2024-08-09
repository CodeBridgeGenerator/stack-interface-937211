import React from "react";
import { render, screen } from "@testing-library/react";

import PathToLogoPage from "../PathToLogoPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders pathToLogo page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PathToLogoPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("pathToLogo-datatable")).toBeInTheDocument();
    expect(screen.getByRole("pathToLogo-add-button")).toBeInTheDocument();
});
