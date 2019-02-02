import {BaseModule} from '@/store/base'
import {CartModule, CartItem, CheckoutStatus, Product, ProductModule} from '@/store/types'
import {Component} from 'vue-property-decorator'
import {NoCache} from '@/base/component'
import {apis} from '@/apis'

export interface CartState {
  items: Array<{id: string, quantity: number}>
  checkoutStatus: CheckoutStatus
}

interface CartModuleDependencies {
  product: ProductModule
}

@Component
export class CartModuleImpl extends BaseModule<CartState> implements CartModule {
  //----------------------------------------------------------------------
  //
  //  Constructors
  //
  //----------------------------------------------------------------------

  constructor() {
    super()
    this.f_initState({
      items: [],
      checkoutStatus: CheckoutStatus.None,
    })
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  m_dependencies!: CartModuleDependencies

  //----------------------------------------------------------------------
  //
  //  Properties
  //
  //----------------------------------------------------------------------

  get checkoutStatus(): CheckoutStatus {
    return this.f_state.checkoutStatus
  }

  @NoCache
  get cartItems(): CartItem[] {
    const allProducts = this.m_dependencies.product.allProducts
    return this.f_state.items.map(({id, quantity}) => {
      const product = allProducts.find(item => item.id === id)!
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
      }
    })
  }

  get cartTotalPrice(): number {
    return this.cartItems.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }

  //----------------------------------------------------------------------
  //
  //  Methods
  //
  //----------------------------------------------------------------------

  init(dependencies: CartModuleDependencies): void {
    this.m_dependencies = dependencies
  }

  getCartItemById(productId: string): CartItem | undefined {
    const product = this.m_getProductById(productId)
    const cartItem = this.f_state.items.find(item => {
      return item.id === productId
    })
    if (!cartItem) return undefined
    return {
      id: cartItem.id,
      title: product.title,
      price: product.price,
      quantity: cartItem.quantity,
    }
  }

  addProductToCart(productId: string): void {
    const product = this.m_getProductById(productId)
    this.f_state.checkoutStatus = CheckoutStatus.None
    if (product.inventory > 0) {
      const cartItem = this.f_state.items.find(item => item.id === product.id)
      if (!cartItem) {
        this.m_pushProductToCart(product.id)
      } else {
        this.m_incrementItemQuantity(cartItem.id)
      }
      // 在庫を1つ減らす
      this.m_dependencies.product.decrementProductInventory(product.id)
    }
  }

  async checkout(): Promise<void> {
    const savedCartItems = [...this.f_state.items]
    this.f_state.checkoutStatus = CheckoutStatus.None
    try {
      await apis.shop.buyProducts(this.f_state.items)
      this.f_state.items = [] // カートを空にする
      this.f_state.checkoutStatus = CheckoutStatus.Successful
    } catch (err) {
      this.f_state.checkoutStatus = CheckoutStatus.Failed
      // カートの内容をAPIリクエス前の状態にロールバックする
      this.f_state.items = savedCartItems
    }
  }

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  m_pushProductToCart(productId: string): void {
    this.f_state.items.push({
      id: productId,
      quantity: 1,
    })
  }

  m_incrementItemQuantity(productId: string): void {
    const cartItem = this.f_state.items.find(item => item.id === productId)
    if (cartItem) {
      cartItem.quantity++
    }
  }

  m_getProductById(productId: string): Product {
    const result = this.m_dependencies.product.getProductById(productId)
    if (!result) {
      throw new Error(`A product that matches the specified productId "${productId}" was not found.`)
    }
    return result
  }
}

export function newCartModule(dependencies: CartModuleDependencies): CartModule {
  const result = new CartModuleImpl()
  result.init(dependencies)
  return result
}
