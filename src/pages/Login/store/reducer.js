import { LOGIN_IN } from './constants'
const defaultState = {
  token: ''
}
export default (state=defaultState, action) => {
  switch (action.type) {
    case LOGIN_IN:
      return {...state, token:action.data}
      // break;
    default:
      return state
      // break;
  }

}