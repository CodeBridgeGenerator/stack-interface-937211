import React from "react";
import { render, screen } from "@testing-library/react";

import AppvalidatePage from "../AppvalidatePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders appvalidate page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AppvalidatePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("appvalidate-datatable")).toBeInTheDocument();
    expect(screen.getByRole("appvalidate-add-button")).toBeInTheDocument();
});
