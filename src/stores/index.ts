import Vue from 'vue';
import { newCartStore } from './cart-store';
import { newProductStore } from './product-store';
import { Stores, CartStore, ProductStore } from './types';
import { Component } from 'vue-property-decorator';

const debug = process.env.NODE_ENV !== 'production';

@Component
class StoresImpl extends Vue implements Stores {
  constructor() {
    super();
    this.m_product = newProductStore();
    this.m_cart = newCartStore();
  }

  m_product: ProductStore;

  get product(): ProductStore {
    return this.m_product;
  }

  m_cart: CartStore;

  get cart(): CartStore {
    return this.m_cart;
  }
}

export function init(): void {
  Object.defineProperty(Vue.prototype, '$stores', {
    value: new StoresImpl(),
    writable: false,
  });
}

export * from './types';
