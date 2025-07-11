// import { createContext, useEffect, useReducer } from "react"
// import AuthReducer from "./AuthReducer"

// const INITIAL_STATE = {
//     user:JSON.parse(localStorage.getItem("user")) || null,
//     isFetching:false,
//     error:false
// }

// /* Reads the data from the Provider and changes INITIAL_STATE */
// export const AuthContext = createContext(INITIAL_STATE)

// /* Children here are the Components that need to get the data.[In this Application we specified App COmponent as Child in index.js so that we can server every every component exist in the app */
// /* This will provide data to all the children that we are giving here */
// export const AuthContextProvider = ({children}) =>{
//     const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//     useEffect(()=>{
//         localStorage.setItem("user", JSON.stringify(state.user))
//       },[state.user])

//     return (
//         <AuthContext.Provider
//         value={{
//             user:state.user,
//             isFetching:state.isFetching,
//             error:state.error,
//             dispatch
//         }}
//         >
//             {children}
//         </AuthContext.Provider>
//     )
// }

import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// Get the user data string from localStorage
const storedUser = localStorage.getItem("user");

// Correctly parse the user data, handling the case where it doesn't exist
const INITIAL_STATE = {
    // If storedUser exists, parse it. Otherwise, set it to null.
    user: storedUser ? JSON.parse(storedUser) : null,
    isFetching: false,
    error: false
};

/* Reads the data from the Provider and changes INITIAL_STATE */
export const AuthContext = createContext(INITIAL_STATE);

/* Children here are the Components that need to get the data. */
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        // Only set the item if state.user is not null or undefined
        if (state.user) {
            localStorage.setItem("user", JSON.stringify(state.user));
        } else {
            // Remove the item from localStorage if the user is logged out
            localStorage.removeItem("user");
        }
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
