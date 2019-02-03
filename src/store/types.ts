import {Module} from 'vuex'
import {Product as APIProduct} from '../apis'

//----------------------------------------------------------------------
//
//  States
//
//----------------------------------------------------------------------

export interface RootState {
  counter: CounterModule
  product: ProductModule
  cart: CartModule
}

export interface ProductState {
  all: Product[]
}

export interface CartState {
  items: Array<{id: string; quantity: number}>
  checkoutStatus: CheckoutStatus
}

export interface CounterState {
  counter: number
}

//----------------------------------------------------------------------
//
//  Modules
//
//----------------------------------------------------------------------

export interface ProductModule extends Module<ProductState, RootState> {}

export interface CartModule extends Module<CartState, RootState> {}

export interface CounterModule extends Module<CounterState, RootState> {}

//----------------------------------------------------------------------
//
//  Types
//
//----------------------------------------------------------------------

export namespace CounterTypes {
  export const PATH = 'counter'

  export const CURRENT = 'current'

  export const INCREMENT = 'increment'
}

export namespace ProductTypes {
  export const PATH = 'product'

  export const ALL_PRODUCTS = 'allProducts'

  export const GET_PRODUCT_BY_ID = 'getProductById'

  export const SET_PRODUCTS = 'setProducts'

  export const DECREMENT_PRODUCT_INVENTORY = 'decrementProductInventory'

  export const PULL_ALL_PRODUCTS = 'pullAllProducts'
}

export namespace CartTypes {
  export const PATH = 'cart'

  export const CHECKOUT_STATUS = 'checkoutStatus'

  export const CART_ITEMS = 'cartItems'

  export const CART_TOTAL_PRICE = 'cartTotalPrice'

  export const GET_CART_ITEM_BY_ID = 'getCartItemById'

  export const CHECKOUT = 'checkout'

  export const ADD_PRODUCT_TO_CART = 'addProductToCart'

  export const m_SET_CART_ITEMS = 'm_setCartItems'

  export const m_SET_CHECKOUT_STATUS = 'm_setCheckoutStatus'

  export const m_PUSH_PRODUCT_TO_CART = 'm_pushProductToCart'

  export const m_INCREMENT_ITEM_QUANTITY = 'm_incrementItemQuantity'
}

//----------------------------------------------------------------------
//
//  Entities
//
//----------------------------------------------------------------------

export type Product = APIProduct

export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
}

//----------------------------------------------------------------------
//
//  Enumerations
//
//----------------------------------------------------------------------

export enum CheckoutStatus {
  None = 'none',
  Failed = 'failed',
  Successful = 'successful',
}
