import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import customer from './customer'
import config from './config'
import product from './products'
import cart  from './cart'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['customer', 'config', 'product', 'cart']
}

const persistCustomer = {
  key: 'customer',
  storage,
  blacklist: ['error', 'isLoading']
}

const persistCart = {
  key: 'cart',
  storage,
  blacklist: ['carts']
}

const rootReducer = combineReducers({
  customer: persistReducer(persistCustomer, customer),
  config: config,
  product: product,
  cart: persistReducer(persistCart, cart)
})

export default persistReducer(rootPersistConfig, rootReducer);