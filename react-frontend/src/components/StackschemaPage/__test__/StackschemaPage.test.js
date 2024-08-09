import React from "react";
import { render, screen } from "@testing-library/react";

import StackschemaPage from "../StackschemaPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stackschema page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StackschemaPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stackschema-datatable")).toBeInTheDocument();
    expect(screen.getByRole("stackschema-add-button")).toBeInTheDocument();
});
