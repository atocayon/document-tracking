import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import Reactotron from "../ReactotronConfig";

let store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, reduxImmutableStateInvariant()),
    Reactotron.createEnhancer()
  )
);

export { store };
