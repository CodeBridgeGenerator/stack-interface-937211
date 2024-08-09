import React from "react";
import { render, screen } from "@testing-library/react";

import ConfigFilePathPage from "../ConfigFilePathPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders configFilePath page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ConfigFilePathPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("configFilePath-datatable")).toBeInTheDocument();
    expect(screen.getByRole("configFilePath-add-button")).toBeInTheDocument();
});
