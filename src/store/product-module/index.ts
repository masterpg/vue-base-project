import {BaseModule} from '@/store/base'
import {Component} from 'vue-property-decorator'
import {NoCache} from '@/base/component'
import {Product, ProductModule} from '@/store/types'
import {apis} from '@/apis'

export interface ProductState {
  all: Product[]
}

@Component
export class ProductModuleImpl extends BaseModule<ProductState> implements ProductModule {
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

  created() {}

  //----------------------------------------------------------------------
  //
  //  Methods
  //
  //----------------------------------------------------------------------

  getProductById(productId: string): Product | undefined {
    const stateProduct = this.m_getStateProductById(productId)
    return this.$utils.cloneDeep(stateProduct)
  }

  decrementProductInventory(productId: string): void {
    const stateProduct = this.m_getStateProductById(productId)
    if (stateProduct) {
      stateProduct.inventory--
    }
  }

  async pullAllProducts(): Promise<void> {
    const products = await apis.shop.getProducts()
    this.f_state.all = products
  }

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  m_getStateProductById(productId: string): Product | undefined {
    return this.f_state.all.find(item => item.id === productId)
  }
}

export function newProductModule(): ProductModule {
  return new ProductModuleImpl()
}
