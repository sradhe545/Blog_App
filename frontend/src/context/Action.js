export const LoginStart=(userCedentials)=>({
    type:'LOGIN_START'
})

export const LoginSuccessfull=(user)=>({
    type:'LOGIN_SUCCESS',
    payload:user
})

export const LoginFailure=()=>({
    type:'LOGIN_FAILURE'
})
export const Logiout=()=>({
    type:'LOGOUT'
})

export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START",
  });
  
  export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,
  });
  
  export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE",
  });