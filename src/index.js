import React from "react";
import { render } from "react-dom";
import App from "./component/App";
import * as serviceWorker from "./serviceWorker";
import "./ReactotronConfig";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { SnackbarProvider } from "notistack";
render(
  <ReduxProvider store={store}>
    <Router>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Router>
  </ReduxProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
