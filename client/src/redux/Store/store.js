import { configureStore, combineReducers } from '@reduxjs/toolkit';
import BaseApi from '../BaseQuery/baseQuery';
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "../Slice/tokenSlice";
import userReducer from "../Slice/userDataSlice";



const rootReducer = combineReducers({
    [BaseApi.reducerPath]: BaseApi.reducer,
    auth: authReducer,
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist:["user"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiiddleware) => getDefaultMiiddleware({
        serializableCheck: false
    }).concat(BaseApi.middleware),
});

export const persistor = persistStore(store)
export default store;