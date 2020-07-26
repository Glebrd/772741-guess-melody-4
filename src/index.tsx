import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import App from "./components/app/app";
import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";
import {Operation as UserOperations, ActionCreator, AuthorizationStatus} from "./reducer/user/user";
import {createAPI} from "./api";
import {composeWithDevTools} from "redux-devtools-extension";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorizaton(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadQuestions());
store.dispatch(UserOperations.checkAuth());

ReactDOM.render(
    <Provider store={store}> <App/> </Provider>,
    document.querySelector(`#root`)
);
