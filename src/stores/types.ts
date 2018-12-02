import { Product as APIProduct } from '../apis';

//----------------------------------------------------------------------
//
//  Stores
//
//----------------------------------------------------------------------

export interface Stores {
  readonly product: ProductStore;

  readonly cart: CartStore;
}

export interface ProductStore {
  readonly allProducts: Product[];

  getProductById(productId: string): Product | undefined;

  decrementProductInventory(productId: string): void;

  getAllProducts(): Promise<void>;
}

export interface CartStore {
  readonly checkoutStatus: CheckoutStatus;

  readonly cartProducts: CartProduct[];

  readonly cartTotalPrice: number;

  getCartProductById(productId: string): CartProduct | undefined;

  checkout(): Promise<void>;

  addProductToCart(productId: string): void;
}

//----------------------------------------------------------------------
//
//  Entities
//
//----------------------------------------------------------------------

export type Product = APIProduct;

export interface CartProduct {
  id: string;
  title: string;
  price: number;
  quantity: number;
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
