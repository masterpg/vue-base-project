import {Product as APIProduct} from '@/apis'

//----------------------------------------------------------------------
//
//  Modules
//
//----------------------------------------------------------------------

export interface AppStore {
  readonly product: ProductModule

  readonly cart: CartModule
}

export interface ProductModule {
  readonly allProducts: Product[]

  getProductById(productId: string): Product | undefined

  decrementProductInventory(productId: string): void

  pullAllProducts(): Promise<void>
}

export interface CartModule {
  readonly checkoutStatus: CheckoutStatus

  readonly cartItems: CartItem[]

  readonly cartTotalPrice: number

  getCartItemById(productId: string): CartItem | undefined

  checkout(): Promise<void>

  addProductToCart(productId: string): void
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
