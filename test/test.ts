(async () => {
  mocha.setup({ ui: 'tdd' });

  const utils = await import('../src/base/utils');
  const config = await import('../src/base/config');
  const apis = await import('../src/apis');
  const stores = await import('../src/stores');

  utils.init();
  config.init();
  apis.init();
  stores.init();

  await Promise.all([
    import('./api/shop-api'),
    import('./stores/cart-store'),
    import('./stores/product-store'),
  ]);

  mocha.run();
})();
