import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import {CartTypes, CounterTypes, ProductTypes, RootState} from '@/store/types'
import {cartModule} from '@/store/cart-module'
import {counterModule} from '@/store/counter-module'
import {productModule} from '@/store/product-module'

Vue.use(Vuex)

export const store = new Vuex.Store<RootState>({
  modules: {
    [ProductTypes.PATH]: productModule,
    [CartTypes.PATH]: cartModule,
    [CounterTypes.PATH]: counterModule,
  },
} as StoreOptions<RootState>)

export * from './types'
