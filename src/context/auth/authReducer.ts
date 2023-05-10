import { IUser } from "@/interfaces";
import { AuthState } from "./AuthProvider";

type AuthActionType = 
    | { type: '[Auth] - Login', payload: IUser }
    | { type: '[Auth] - Logout' }
    // | { type: '[Auth] - Register' }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
            }
        
        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
            }
        default:
            return state;
    }
}