import 'animate.css/animate.css'
import '@/styles/polymer/polymer-styles.js'
import '@/index.css'

import AppView from '@/index.vue'
import Vue from 'vue'
import {currency} from '@/currency'
import {i18n, initI18n} from '@/base/i18n'
import {initAPI} from '@/apis'
import {initConfig} from '@/base/config'
import {initServiceWorker} from '@/base/service-worker'
import {store} from '@/store'
import {initUtils} from '@/base/utils'
import {router} from '@/base/router'

// TODO JetBrainsIDE使用時の開発補助コード
import '@/views/abc-view/index.vue'
import '@/views/shopping-view/index.vue'

(async () => {
  initUtils()
  initConfig()
  initServiceWorker()
  initAPI()
  await initI18n()

  Vue.filter('currency', currency)

  new Vue({
    el: '#app',
    router,
    render: h => h(AppView),
    i18n,
    store,
  })
})()
