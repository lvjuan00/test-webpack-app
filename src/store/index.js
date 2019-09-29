import { createStore, applyMiddleware,combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as loginReducer} from '@pages/Login/store'
// const reducer = () =>{
//   return {
//     age: 18
//   }
// }
const reducer = combineReducers({
  login : loginReducer
})
const store = createStore(reducer, applyMiddleware(thunk))
export default store