import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer/GlobalReducer";

// Store dengan Thunk
export const storeRedux = createStore(rootReducer, applyMiddleware(thunk))

// Store tanpa Thunk
// export const storeRedux = createStore(rootReducer)
