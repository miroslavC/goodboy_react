import { combineReducers } from "redux";
import { UserReducer } from "./UserReducer";
import { FormActionReducer } from "./FormActionReducer";

export const rootReducer = combineReducers({
    user: UserReducer,
    form_action: FormActionReducer
});

export type AppState = ReturnType<typeof rootReducer>;
