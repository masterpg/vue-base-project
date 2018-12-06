import Vue from 'vue';
import shopAPI from './shop-api';
import { APIs, ShopAPI } from './types';
import { Component } from 'vue-property-decorator';

const debug = process.env.NODE_ENV !== 'production';

@Component
class APIsImpl extends Vue implements APIs {
  constructor() {
    super();
    this.m_shop = shopAPI;
  }

  m_shop: ShopAPI;

  get shop(): ShopAPI {
    return this.m_shop;
  }
}

export let apis: APIs;

export function initAPI(): void {
  apis = new APIsImpl();
  Object.defineProperty(Vue.prototype, '$apis', {
    value: apis,
    writable: false,
  });
}

export * from './types';
