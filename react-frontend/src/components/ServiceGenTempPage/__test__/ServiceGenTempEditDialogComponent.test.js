import React from "react";
import { render, screen } from "@testing-library/react";

import ServiceGenTempEditDialogComponent from "../ServiceGenTempEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders serviceGenTemp edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceGenTempEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("serviceGenTemp-edit-dialog-component")).toBeInTheDocument();
});
