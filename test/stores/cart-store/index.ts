import * as td from 'testdouble'
import { CartState, CartStoreImpl, newCartStore } from '@/stores/cart-store'
import { CheckoutStatus } from '@/stores'
import { Product as APIProduct } from '@/apis'
import { TestStore } from '../../types'

const assert = chai.assert

suite('store/cart-store', () => {
  const cartStore = newCartStore() as CartStoreImpl & TestStore<CartState>
  const productStore = cartStore.$stores.product
  const shopAPI = cartStore.$apis.shop

  const PRODUCTS: APIProduct[] = [
    { id: '1', title: 'iPad 4 Mini', price: 500.01, inventory: 2 },
    { id: '2', title: 'H&M T-Shirt White', price: 10.99, inventory: 10 },
    { id: '3', title: 'Charli XCX - Sucker CD', price: 19.99, inventory: 5 },
  ]

  setup(() => {
    cartStore.f_initState({
      items: [],
      checkoutStatus: CheckoutStatus.None,
    })
  })

  teardown(() => {
    cartStore.f_initState({
      items: [],
      checkoutStatus: CheckoutStatus.None,
    })
    td.reset()
  })

  test('getCartItemById() - 一般ケース', () => {
    cartStore.f_state.items = [ { id: '1', quantity: 1 } ]
    const product = PRODUCTS[0]
    td.replace(cartStore, 'm_getProductById')
    td.when(cartStore.m_getProductById(product.id)).thenReturn(product)

    const actual = cartStore.getCartItemById(product.id)
    assert.deepEqual(actual, {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    })
  })

  test('getCartItemById() - 存在しない商品IDを指定した場合', () => {
    assert.throws(() => cartStore.getCartItemById('9876'), Error, 'A product that matches the specified productId "9876" was not found.')
  })

  test('addProductToCart() - 一般ケース', () => {
    const product = PRODUCTS[1]
    // 【準備】
    td.replace(cartStore, 'm_getProductById')
    td.when(cartStore.m_getProductById(product.id)).thenReturn(product)

    const decrementProductInventory = td.replace(productStore, 'decrementProductInventory')

    // 【実行】
    // `addProductToCart()`を2回実行
    cartStore.addProductToCart(product.id)
    cartStore.addProductToCart(product.id)

    // 【検証】
    assert.equal(cartStore.f_state.checkoutStatus, CheckoutStatus.None)
    // カートに追加された商品とその数量を検証
    const cartItem = cartStore.getCartItemById(product.id)
    assert.equal(cartItem!.id, product.id)
    assert.equal(cartItem!.quantity, 2)

    // `ProductStore#decrementProductInventory()`の呼び出し回数と渡された引数を検証
    const decrementProductInventoryExplain = td.explain(decrementProductInventory)
    assert.equal(decrementProductInventoryExplain.callCount, 2)
    assert.equal(decrementProductInventoryExplain.calls[0].args[0], product.id)
    assert.equal(decrementProductInventoryExplain.calls[1].args[0], product.id)
  })

  test('checkout() - 一般ケース', async () => {
    const CART_ITEMS = [ { id: '1', quantity: 1 }, { id: '2', quantity: 1 } ]
    cartStore.f_state.items = CART_ITEMS
    const buyProducts = td.replace(shopAPI, 'buyProducts')
    td.when(shopAPI.buyProducts(CART_ITEMS)).thenResolve()

    await cartStore.checkout()
    assert.equal(cartStore.f_state.checkoutStatus, CheckoutStatus.Successful)
    assert.deepEqual(cartStore.f_state.items, [])

    // `ShopAPI#buyProducts()`の呼び出し回数と渡された引数を検証
    const buyProductsExplain = td.explain(buyProducts)
    assert.equal(buyProductsExplain.callCount, 1)
    assert.deepEqual(buyProductsExplain.calls[0].args[0], CART_ITEMS)
  })

  test('checkout() - エラーケース', async () => {
    const CART_ITEMS = [ { id: '1', quantity: 1 }, { id: '2', quantity: 1 } ]
    cartStore.f_state.items = CART_ITEMS

    const buyProducts = td.replace(shopAPI, 'buyProducts')
    td.when(shopAPI.buyProducts(CART_ITEMS)).thenReject(new Error())

    await cartStore.checkout()
    assert.equal(cartStore.f_state.checkoutStatus, CheckoutStatus.Failed)
    assert.deepEqual(cartStore.f_state.items, CART_ITEMS)
  })
})
