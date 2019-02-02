import Vue from 'vue'
import {CartItem, CartTypes, CheckoutStatus, CounterTypes, Product, ProductTypes, RootState} from '@/store/types'
import {Component} from 'vue-property-decorator'
import {Store} from 'vuex'

@Component
export class AppStore extends Vue {
  m_store: Store<RootState>

  setStore(store: Store<RootState>) {
    this.counter.setStore(store)
    this.product.setStore(store)
    this.cart.setStore(store)
  }

  m_counter = new CounterModule()

  get counter(): CounterModule {
    return this.m_counter
  }

  m_product = new ProductModule()

  get product(): ProductModule {
    return this.m_product
  }

  m_cart = new CartModule()

  get cart(): CartModule {
    return this.m_cart
  }
}

@Component
class CounterModule extends Vue {
  m_store: Store<RootState>

  setStore(store: Store<RootState>) {
    this.m_store = store
  }

  get current(): number {
    return this.m_store.getters[`${CounterTypes.PATH}/${CounterTypes.CURRENT}`]
  }

  increment(): void {
    this.m_store.commit(`${CounterTypes.PATH}/${CounterTypes.INCREMENT}`)
  }
}

@Component
class ProductModule extends Vue {
  m_store: Store<RootState>

  setStore(store: Store<RootState>) {
    this.m_store = store
  }

  get allProducts(): Product[] {
    return this.m_store.getters[`${ProductTypes.PATH}/${ProductTypes.ALL_PRODUCTS}`]
  }

  getProductById(productId: string): Product | undefined {
    return this.m_store.getters[`${ProductTypes.PATH}/${ProductTypes.GET_PRODUCT_BY_ID}`](productId)
  }

  pullAllProducts(): Promise<void> {
    return this.m_store.dispatch(`${ProductTypes.PATH}/${ProductTypes.PULL_ALL_PRODUCTS}`)
  }

  setProducts(products: Product[]): void {
    return this.m_store.commit(`${ProductTypes.PATH}/${ProductTypes.SET_PRODUCTS}`, products)
  }

  decrementProductInventory(productId: string): void {
    return this.m_store.commit(`${ProductTypes.PATH}/${ProductTypes.DECREMENT_PRODUCT_INVENTORY}`, productId)
  }
}

@Component
class CartModule extends Vue {
  m_store: Store<RootState>

  setStore(store: Store<RootState>) {
    this.m_store = store
  }

  get checkoutStatus(): CheckoutStatus {
    return this.m_store.getters[`${CartTypes.PATH}/${CartTypes.CHECKOUT_STATUS}`]
  }

  get cartItems(): CartItem[] {
    return this.m_store.getters[`${CartTypes.PATH}/${CartTypes.CART_ITEMS}`]
  }

  get cartTotalPrice(): number {
    return this.m_store.getters[`${CartTypes.PATH}/${CartTypes.CART_TOTAL_PRICE}`]
  }

  getCartItemById(productId: string): Product | undefined {
    return this.m_store.getters[`${CartTypes.PATH}/${CartTypes.GET_CART_ITEM_BY_ID}`](productId)
  }

  checkout(): Promise<void> {
    return this.m_store.dispatch(`${CartTypes.PATH}/${CartTypes.CHECKOUT}`)
  }

  addProductToCart(productId: string): Promise<void> {
    return this.m_store.dispatch(`${CartTypes.PATH}/${CartTypes.ADD_PRODUCT_TO_CART}`, productId)
  }
}

export function newAppStore(store: Store<RootState>) {
  const result = new AppStore()
  result.setStore(store)
  return result
}
