import isEmpty from 'lodash/fp/isEmpty'

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  showLogoutNotification: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        isAuthenticated: !isEmpty(action.userInfo),
        currentUser: action.userInfo
      }
    case 'LOG_OUT':
      return {
        isAuthenticated: false,
        currentUser: {},
        showLogoutNotification: true
      }
    case 'RM_LOGOUT_NOTIFICATION':
      return {
        ...state,
        showLogoutNotification: false
      }
    default:
      return state
  }
}
