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

  export type current = number

  export const INCREMENT = 'increment'

  export type increment = () => void
}

export namespace ProductTypes {
  export const PATH = 'product'

  export const ALL_PRODUCTS = 'allProducts'

  export type allProducts = Product[]

  export const GET_PRODUCT_BY_ID = 'getProductById'

  export type getProductById = (productId: string) => Product | undefined

  export const PULL_ALL_PRODUCTS = 'pullAllProducts'

  export type pullAllProducts = () => Promise<void>

  export const SET_PRODUCTS = 'setProducts'

  export type setProducts = (products: Product[]) => void

  export const DECREMENT_PRODUCT_INVENTORY = 'decrementProductInventory'

  export type decrementProductInventory = (productId: string) => void
}

export namespace CartTypes {
  export const PATH = 'cart'

  export const CHECKOUT_STATUS = 'checkoutStatus'

  export type checkoutStatus = CheckoutStatus

  export const CART_ITEMS = 'cartItems'

  export type cartItems = CartItem[]

  export const CART_TOTAL_PRICE = 'cartTotalPrice'

  export type cartTotalPrice = number

  export const GET_CART_ITEM_BY_ID = 'getCartItemById'

  export type getCartItemById = (productId: string) => CartItem | undefined

  export const CHECKOUT = 'checkout'

  export type checkout = () => Promise<void>

  export const ADD_PRODUCT_TO_CART = 'addProductToCart'

  export type addProductToCart = (productId: string) => Promise<void>

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
