import { createReducer, on } from "@ngrx/store";
import { UserState } from "./user.state";
import { registeresuccess } from "./user.action";

const _UserReducer = createReducer(UserState,
    
    on(registeresuccess, (state, action) => {
        return {
            ...state,
            response:action.response
        }
    })
)

export function UserReducer(state: any, action: any) {
    return _UserReducer(state, action);
}