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

export function init(): void {
  Object.defineProperty(Vue.prototype, '$apis', {
    value: new APIsImpl(),
    writable: false,
  });
}

export * from './types';
