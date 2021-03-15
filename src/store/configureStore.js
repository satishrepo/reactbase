import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rooReducer';

const persistConfig = {
    key: 'root',
    storage,
}
   
const persistedReducer = persistReducer(persistConfig, rootReducer)
   
// export default () => {
    let store = createStore(
        persistedReducer,
        {},
        compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : (f) => f)
    )
    let persistor = persistStore(store)
    // return { store, persistor }
// }

export { store, persistor }

// export default createStore(
//     rootReducer,
//     {},
//     compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : (f) => f)
// );
