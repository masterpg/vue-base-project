import { BaseStore } from '@/stores/base'
import { Component } from 'vue-property-decorator'
import { NoCache } from '@/base/component'
import { Product, ProductStore } from '@/stores/types'

export interface ProductState {
  all: Product[]
}

@Component
export class ProductStoreImpl extends BaseStore<ProductState> implements ProductStore {
  //----------------------------------------------------------------------
  //
  //  Constructors
  //
  //----------------------------------------------------------------------

  constructor() {
    super()
    this.f_initState({
      all: [],
    })
  }

  //----------------------------------------------------------------------
  //
  //  Properties
  //
  //----------------------------------------------------------------------

  @NoCache
  get allProducts(): Product[] {
    return this.$utils.cloneDeep(this.f_state.all)
  }

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  created() {
    this.getAllProducts()
  }

  //----------------------------------------------------------------------
  //
  //  Methods
  //
  //----------------------------------------------------------------------

  getProductById(productId: string): Product | undefined | null {
    const stateProduct = this.m_getStateProductById(productId)
    return this.$utils.cloneDeep(stateProduct)
  }

  decrementProductInventory(productId: string): void {
    const stateProduct = this.m_getStateProductById(productId)
    if (stateProduct) {
      stateProduct.inventory--
    }
  }

  async getAllProducts(): Promise<void> {
    const products = await this.$apis.shop.getProducts()
    this.f_state.all = products
  }

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  m_getStateProductById(productId: string): Product | undefined | null {
    return this.f_state.all.find((item) => item.id === productId)
  }
}

export function newProductStore(): ProductStore {
  return new ProductStoreImpl()
}
