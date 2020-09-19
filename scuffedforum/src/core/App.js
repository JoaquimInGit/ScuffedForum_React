import React from "react";
import RouterComponent from "./Router";
import AuthComponent from "./Auth";

export default class App extends React.Component {
  render() {
    return (
      <div style = {{backgroundColor : "#6c757d ", height: "100vh" }} >
      <AuthComponent>
        <RouterComponent />
      </AuthComponent>
      </div>
    );
  }
}