// import { FC, useReducer, useEffect } from 'react';
// import { useRouter } from 'next/router';

// // import { toast } from "react-toastify";
// // import Cookies from "js-cookie";

// import { authReducer, AuthContext } from '.';
// // import { IUser } from "@/interfaces";
// // import { tesloApi } from "@/api";


// export interface AuthState {
//     isLoggedIn: boolean;
//     user?: IUser;
// }

// const AUTH_INITIAL_STATE: AuthState = {
//     isLoggedIn: false,
//     user: undefined
// }

// export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

//     const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
//     const router = useRouter();

//     useEffect(() => {
//         checkToken();
//     }, [])

//     const checkToken = async () => {
//         if(!Cookies.get('token')){
//             return;
//         }
//         try {
//             const data = await tesloApi({ url: '/user/validate-token' });
//             const { message, token, user } = await data.json();

//             if (message) {
//                 router.push('/auth/login')
//                 Cookies.remove('token')
//                 return;
//             }
//             Cookies.set('token', token);
//             dispatch({ type: '[Auth] - Login', payload: user })

//         } catch (error) {
//             Cookies.remove('token')
//             router.push('/auth/login')
//         }
//     }

//     //Methods
//     const loginUser = async (email: string, password: string): Promise<boolean> => {
//         try {
//             const data = await tesloApi({
//                 url: '/user/login',
//                 data: { email, password },
//                 method: 'POST'
//             });
//             const { message, token, user } = await data.json();
//             if (message) {
//                 toast(message, {
//                     position: "top-right",
//                     autoClose: 3000,
//                     hideProgressBar: false,
//                     closeOnClick: false,
//                     pauseOnHover: false,
//                     draggable: false,
//                     theme: "light",
//                     type: 'error',
//                     closeButton: false
//                 })
//                 return false;
//             }
//             Cookies.set('token', token);
//             dispatch({ type: '[Auth] - Login', payload: user })
//             return true;
//         } catch (error) {
//             console.log('Error: ', error)
//             return false
//         }
//     }

//     const registerUser = async (email: string, password: string, name: string): Promise<boolean> => {
//         try {
//             const data = await tesloApi({
//                 url: '/user/register',
//                 data: { email, password, name },
//                 method: 'POST'
//             });
//             const { message, token, user } = await data.json();
//             if (message) {
//                 toast(message, {
//                     position: "top-right",
//                     autoClose: 3000,
//                     hideProgressBar: false,
//                     closeOnClick: false,
//                     pauseOnHover: false,
//                     draggable: false,
//                     theme: "light",
//                     type: 'error',
//                     closeButton: false
//                 })
//                 return false;
//             }
//             Cookies.set('token', token);
//             dispatch({ type: '[Auth] - Login', payload: user })
//             return true;
//         } catch (error) {
//             console.log('Error: ', error)
//             return false
//         }
//     }

//     const logoutUser = () => {
//       Cookies.remove('cart')
//       Cookies.remove('token')
//       router.reload()
//     }

//     return (
//         <AuthContext.Provider value={{
//             ...state,

//             //Methods
//             loginUser,
//             registerUser,
//             logoutUser
//         }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

