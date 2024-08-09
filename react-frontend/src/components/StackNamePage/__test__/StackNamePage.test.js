import React from "react";
import { render, screen } from "@testing-library/react";

import StackNamePage from "../StackNamePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stackName page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StackNamePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stackName-datatable")).toBeInTheDocument();
    expect(screen.getByRole("stackName-add-button")).toBeInTheDocument();
});
