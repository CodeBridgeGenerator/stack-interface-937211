import React from "react";
import { render, screen } from "@testing-library/react";

import PathToLogoEditDialogComponent from "../PathToLogoEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders pathToLogo edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PathToLogoEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("pathToLogo-edit-dialog-component")).toBeInTheDocument();
});
