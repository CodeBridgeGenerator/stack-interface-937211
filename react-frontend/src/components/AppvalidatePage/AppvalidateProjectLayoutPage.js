import React from "react";
import ProjectLayout from "../Layouts/ProjectLayout";
import { connect } from "react-redux";
import AppvalidatePage from "./AppvalidatePage";

const AppvalidateProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <AppvalidatePage />
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(AppvalidateProjectLayoutPage);