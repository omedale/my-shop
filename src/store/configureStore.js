import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from 'redux-persist'
// import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/index'


// const loggerMiddleware = createLogger()

export default () => {
  let store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware)
    )
  )
  let persistor = persistStore(store)
  return { store, persistor }
}
