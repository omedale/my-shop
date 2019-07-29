import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import customer from './customer'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['customer']
}

const persistCustomer = {
  key: 'customer',
  storage,
  blacklist: ['error', 'isLoading']
}

const rootReducer = combineReducers({
  customer: persistReducer(persistCustomer, customer)
})

export default persistReducer(rootPersistConfig, rootReducer);