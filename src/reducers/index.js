import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import customer from './customer'
import config from './config'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['customer', 'config']
}

const persistCustomer = {
  key: 'customer',
  storage,
  blacklist: ['error', 'isLoading']
}

const rootReducer = combineReducers({
  customer: persistReducer(persistCustomer, customer),
  config: config
})

export default persistReducer(rootPersistConfig, rootReducer);