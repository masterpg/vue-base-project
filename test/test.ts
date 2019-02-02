import '@babel/polyfill'

(async () => {
  mocha.setup({ui: 'tdd'})

  const utils = await import('../src/base/utils')
  const config = await import('../src/base/config')
  const apis = await import('../src/apis')
  const store = await import('../src/store')

  utils.initUtils()
  config.initConfig()
  apis.initAPI()
  store.initStore()

  await Promise.all([import('./api/shop-api'), import('./store/cart-module'), import('./store/product-module')])

  mocha.run()
})()
