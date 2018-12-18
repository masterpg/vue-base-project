import '@babel/polyfill';
import '@/styles/polymer-styles.js';
import '@/index.pcss';

import AppView from '@/index.vue';
import Vue from 'vue';
import { currency } from '@/currency';
import { i18n, initI18n } from '@/base/i18n';
import { initAPI } from '@/apis';
import { initConfig } from '@/base/config';
import { initServiceWorker } from '@/base/service-worker';
import { initStores } from '@/stores';
import { initUtils } from '@/base/utils';
import { router } from '@/base/router';

(async () => {
  initUtils();
  initConfig();
  initServiceWorker();
  initAPI();
  initStores();
  await initI18n();

  Vue.filter('currency', currency);

  new Vue({
    el: '#app',
    router,
    render: (h) => h(AppView),
    i18n,
  });
})();
