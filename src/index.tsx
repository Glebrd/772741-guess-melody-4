import * as React from "react";
import {compose} from "redux";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import App from "./components/app/app";
import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";
import {Operation as UserOperations, ActionCreator, AuthorizationStatus} from "./reducer/user/user";
import {createAPI} from "./api";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorizaton(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.loadQuestions());
store.dispatch(UserOperations.checkAuth());

ReactDOM.render(
    <Provider store={store}> <App/> </Provider>,
    document.querySelector(`#root`)
);
