export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOG_OUT = 'LOG_OUT'

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  }
}

export function handleLoginUser(id) {
  return (dispatch) => {
    return dispatch(setAuthedUser(id))
  }
}

export function handleLogoutUser() {
  return {
    type: LOG_OUT
  }
}