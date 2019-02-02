import {GetterTree, MutationTree, ActionTree} from 'vuex'
import {ProductModule, ProductState, RootState, Product, ProductTypes} from '@/store/types'
import {apis} from '@/apis'

export const productModule = new class implements ProductModule {
  namespaced = true

  state: ProductState = {
    all: [],
  }

  getters: GetterTree<ProductState, RootState> = {
    [ProductTypes.ALL_PRODUCTS](state): Product[] {
      return state.all
    },

    [ProductTypes.GET_PRODUCT_BY_ID](state) {
      return (productId: string) => {
        const product = state.all.find(item => item.id === productId)
        return product
      }
    },
  }

  mutations: MutationTree<ProductState> = {
    [ProductTypes.SET_PRODUCTS](state, products: Product[]): void {
      state.all = products
    },

    [ProductTypes.DECREMENT_PRODUCT_INVENTORY](state, productId: string): void {
      const product = state.all.find(item => item.id === productId)
      if (product) {
        product.inventory--
      }
    },
  }

  actions: ActionTree<ProductState, RootState> = {
    async [ProductTypes.PULL_ALL_PRODUCTS](context): Promise<void> {
      const products = await apis.shop.getProducts()
      context.commit(ProductTypes.SET_PRODUCTS, products)
    },
  }
}()
