import * as td from 'testdouble'
import { Product as APIProduct } from '@/apis'
import { Product } from '@/stores'
import { TestStore } from '../../types'
import { newProductStore, ProductState, ProductStoreImpl } from '@/stores/product-store'

const assert = chai.assert

suite('store/product-store', () => {
  const productStore = newProductStore() as ProductStoreImpl & TestStore<ProductState>
  const shopAPI = productStore.$apis.shop

  const API_PRODUCTS: APIProduct[] = [
    { id: '1', title: 'iPad 4 Mini', price: 500.01, inventory: 2 },
    { id: '2', title: 'H&M T-Shirt White', price: 10.99, inventory: 10 },
    { id: '3', title: 'Charli XCX - Sucker CD', price: 19.99, inventory: 5 },
  ]

  setup(() => {
    productStore.f_initState({
      all: API_PRODUCTS,
    })
  })

  teardown(() => {
    td.reset()
  })

  test('getProductById() - 取得できるパターン', () => {
    const stateProduct = productStore.m_getStateProductById('1') as Product
    const actual = productStore.getProductById(stateProduct.id)
    assert.deepEqual(actual, stateProduct)
    // actualとproductが同一オブジェクトでないことを検証
    // (つまりコピーであることを検証)
    assert.notEqual(actual, stateProduct)
  })

  test('getProductById() - 取得できないパターン', () => {
    const actual = productStore.getProductById('9876')
    assert.isUndefined(actual)
  })

  test('decrementProductInventory() - 一般ケース', () => {
    const stateProduct = productStore.m_getStateProductById('1') as Product
    const inventoryBk = stateProduct.inventory
    productStore.decrementProductInventory(stateProduct.id)
    assert.equal(stateProduct.inventory, inventoryBk - 1)
  })

  test('decrementProductInventory() - 存在しない商品IDを指定した場合', () => {
    productStore.decrementProductInventory('9876')
    // 何も問題は起きない
    assert(true)
  })

  test('getAllProducts()', async () => {
    const NEW_API_PRODUCTS = [ { id: '1', title: 'product1', price: 101, inventory: 1 }, { id: '2', title: 'product2', price: 102, inventory: 2 } ]
    td.replace(shopAPI, 'getProducts')
    td.when(shopAPI.getProducts()).thenResolve(NEW_API_PRODUCTS)

    await productStore.getAllProducts()
    assert.deepEqual(productStore.allProducts, NEW_API_PRODUCTS)
  })
})
