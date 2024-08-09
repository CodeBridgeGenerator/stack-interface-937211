import React from "react";
import { render, screen } from "@testing-library/react";

import ServiceGenTempCreateDialogComponent from "../ServiceGenTempCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders serviceGenTemp create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceGenTempCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("serviceGenTemp-create-dialog-component")).toBeInTheDocument();
});
