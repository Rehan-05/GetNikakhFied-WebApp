import { createStore, applyMiddleware } from "redux";
import createThunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

// import sagas from '../sagas';

import reducers from "./reducers";

const loggerMidleware = createLogger();

const rootReducer = reducers;

const ThunkMiddleware = createThunkMiddleware;
const middlewares = [ThunkMiddleware];

// if (process.env.NODE_ENV === 'development') {
middlewares.push(loggerMidleware);
// }

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStoreWithMiddleware = applyMiddleware(...middlewares);

export const store = createStore(persistedReducer, createStoreWithMiddleware);

export const configureStore = () => {
  return store;
};
// ThunkMiddleware.run(sagas);

export const persistor = persistStore(store);
