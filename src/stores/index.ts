import Vue from 'vue'
import { newCartStore } from '@/stores/cart-store'
import { newProductStore } from '@/stores/product-store'
import { Stores, CartStore, ProductStore } from '@/stores/types'
import { Component } from 'vue-property-decorator'

const debug = process.env.NODE_ENV !== 'production'

@Component
class StoresImpl extends Vue implements Stores {
  constructor() {
    super()
    this.m_product = newProductStore()
    this.m_cart = newCartStore()
  }

  m_product: ProductStore;

  get product(): ProductStore {
    return this.m_product
  }

  m_cart: CartStore;

  get cart(): CartStore {
    return this.m_cart
  }
}

export let stores: Stores

export function initStores(): void {
  stores = new StoresImpl()
  Object.defineProperty(Vue.prototype, '$stores', {
    value: stores,
    writable: false,
  })
}

export * from '@/stores/types'
