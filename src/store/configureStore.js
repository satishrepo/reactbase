import { applyMiddleware, createStore, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rooReducer';

export default createStore(
    rootReducer,
    {},
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : (f) => f)
);
