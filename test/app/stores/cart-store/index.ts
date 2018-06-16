import * as td from 'testdouble';
import { CartState, newCartStore } from '../../../../src/app/stores/cart-store';
import { CartStore, CheckoutStatus, Product } from '../../../../src/app/stores/types';
import { Product as APIProduct } from '../../../../src/app/apis/types';
import { TestStore } from '../../../types';

const assert = chai.assert;

suite('store/cart-store', () => {
  const cartStore = newCartStore() as CartStore &
    TestStore<CartState> & {
      getProductById(productId: string): Product;
    };
  const productStore = cartStore.$stores.product;
  const shopAPI = cartStore.$apis.shop;

  const PRODUCTS: APIProduct[] = [
    { id: '1', title: 'iPad 4 Mini', price: 500.01, inventory: 2 },
    { id: '2', title: 'H&M T-Shirt White', price: 10.99, inventory: 10 },
    { id: '3', title: 'Charli XCX - Sucker CD', price: 19.99, inventory: 5 },
  ];

  setup(() => {
    cartStore.initState({
      added: [],
      checkoutStatus: CheckoutStatus.None,
    });
  });

  teardown(() => {
    cartStore.initState({
      added: [],
      checkoutStatus: CheckoutStatus.None,
    });
    td.reset();
  });

  test('getCartProductById() - 一般ケース', () => {
    cartStore.state.added = [{ id: '1', quantity: 1 }];
    const product = PRODUCTS[0];
    td.replace(cartStore, 'getProductById');
    td.when(cartStore.getProductById(product.id)).thenReturn(product);

    const actual = cartStore.getCartProductById(product.id);
    assert.deepEqual(actual, {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  });

  test('getCartProductById() - 存在しない商品IDを指定した場合', () => {
    assert.throws(
      () => cartStore.getCartProductById('9876'),
      Error,
      'A Product that matches the specified productId `9876` was not found.',
    );
  });

  test('addProductToCart() - 一般ケース', () => {
    const product = PRODUCTS[1];
    // 【準備】
    td.replace(cartStore, 'getProductById');
    td.when(cartStore.getProductById(product.id)).thenReturn(product);

    const decrementProductInventory = td.replace(productStore, 'decrementProductInventory');

    // 【実行】
    // `addProductToCart()`を2回実行
    cartStore.addProductToCart(product.id);
    cartStore.addProductToCart(product.id);

    // 【検証】
    assert.equal(cartStore.state.checkoutStatus, CheckoutStatus.None);
    // カートに追加された商品とその数量を検証
    const cartProduct = cartStore.getCartProductById(product.id);
    assert.equal(cartProduct!.id, product.id);
    assert.equal(cartProduct!.quantity, 2);

    // `ProductStore#decrementProductInventory()`の呼び出し回数と渡された引数を検証
    const decrementProductInventoryExplain = td.explain(decrementProductInventory);
    assert.equal(decrementProductInventoryExplain.callCount, 2);
    assert.equal(decrementProductInventoryExplain.calls[0].args[0], product.id);
    assert.equal(decrementProductInventoryExplain.calls[1].args[0], product.id);
  });

  test('checkout() - 一般ケース', async () => {
    const ADDED = [{ id: '1', quantity: 1 }, { id: '2', quantity: 1 }];
    const buyProducts = td.replace(shopAPI, 'buyProducts');
    td.when(shopAPI.buyProducts(ADDED)).thenResolve();

    await cartStore.checkout(ADDED);
    assert.equal(cartStore.state.checkoutStatus, CheckoutStatus.Successful);
    assert.deepEqual(cartStore.state.added, []);

    // `ShopAPI#buyProducts()`の呼び出し回数と渡された引数を検証
    const buyProductsExplain = td.explain(buyProducts);
    assert.equal(buyProductsExplain.callCount, 1);
    assert.deepEqual(buyProductsExplain.calls[0].args[0], ADDED);
  });

  test('checkout() - エラーケース', async () => {
    const ADDED = [{ id: '1', quantity: 1 }, { id: '2', quantity: 1 }];
    cartStore.state.added = ADDED;

    const buyProducts = td.replace(shopAPI, 'buyProducts');
    td.when(shopAPI.buyProducts(ADDED)).thenReject(new Error());

    await cartStore.checkout(ADDED);
    assert.equal(cartStore.state.checkoutStatus, CheckoutStatus.Failed);
    assert.deepEqual(cartStore.state.added, ADDED);
  });
});
