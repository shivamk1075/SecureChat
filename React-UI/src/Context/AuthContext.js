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

// Safely parse localStorage user
let parsedUser = null;
try {
  const storedUser = localStorage.getItem("user");
  // Avoid parsing "undefined", null, or invalid JSON
  if (storedUser && storedUser !== "undefined") {
    parsedUser = JSON.parse(storedUser);
  }
} catch (err) {
  console.error("Invalid user JSON in localStorage:", err);
  localStorage.removeItem("user"); // optional: clean it up
}

// Initial auth state
const INITIAL_STATE = {
  user: parsedUser,
  isFetching: false,
  error: false,
};

// Create context
export const AuthContext = createContext(INITIAL_STATE);

// Context provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Sync to localStorage when user state changes
  useEffect(() => {
    if (state.user !== undefined) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
