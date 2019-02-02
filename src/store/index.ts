import Vue from 'vue'
import Vuex, {Store, StoreOptions} from 'vuex'

import {AppStore, newAppStore} from '@/store/app-store'
import {CartTypes, CounterTypes, ProductTypes, RootState} from '@/store/types'
import {cartModule} from '@/store/cart-module'
import {counterModule} from '@/store/counter-module'
import {productModule} from '@/store/product-module'

Vue.use(Vuex)

export const store = new Store<RootState>({
  modules: {
    [ProductTypes.PATH]: productModule,
    [CartTypes.PATH]: cartModule,
    [CounterTypes.PATH]: counterModule,
  },
} as StoreOptions<RootState>)

export let appStore: AppStore

export function initStore(): void {
  appStore = newAppStore(store)
  Object.defineProperty(Vue.prototype, '$appStore', {
    value: appStore,
    writable: false,
  })
}

export * from './types'
export {AppStore}
