import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import customer from './customer'
import config from './config'
import product from './products'
import cart  from './cart'
import order  from './order'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['customer', 'config', 'product', 'cart', 'order']
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
  order: order,
  cart: persistReducer(persistCart, cart)
})

export default persistReducer(rootPersistConfig, rootReducer);