import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,

  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,

  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,

  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  CLEAR_ERRORS
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    case USER_LOGOUT:
      return {}

    default:
      return state
  }
}
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      }
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      }
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_UPDATE_PROFILE_RESET:
      return {}

    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {

        loading: true,
      }
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        
        user: action.payload,
      }
    case USER_UPDATE_PROFILE_FAIL:
      return {

        loading: false,
        error: action.payload,
      }
    case USER_UPDATE_PROFILE_RESET:
      return {
        
        loading: false,

      }

    default:
      return state
  }
}

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {

      case FORGOT_PASSWORD_REQUEST:
      case NEW_PASSWORD_REQUEST:
          return {
              ...state,
              loading: true,
              error: null
          }

      case FORGOT_PASSWORD_SUCCESS:
          return {
              ...state,
              loading: false,
              message: action.payload
          }

      case NEW_PASSWORD_SUCCESS:
          return {
              ...state,
              success: action.payload
          }

      case FORGOT_PASSWORD_FAIL:
      case NEW_PASSWORD_FAIL:
          return {
              ...state,
              loading: false,
              error: action.payload
          }

      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state;
  }
}
