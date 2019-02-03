//----------------------------------------------------------------------
//
//  APIs
//
//----------------------------------------------------------------------

export interface APIs {
  readonly shop: ShopAPI
}

export interface ShopAPI {
  getProducts(): Promise<Product[]>

  buyProducts(products: Array<{id: string; quantity: number}>): Promise<void>
}

//----------------------------------------------------------------------
//
//  Entities
//
//----------------------------------------------------------------------

export interface Product {
  id: string
  title: string
  price: number
  inventory: number
}
