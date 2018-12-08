import '@babel/polyfill';
import '@/styles/polymer-styles.js';
import '@/index.css';

import { initAPI } from '@/apis';
import { initConfig } from '@/base/config';
import { i18n, initI18n } from '@/base/i18n';
import { initStores } from '@/stores';
import { initServiceWorker } from '@/base/service-worker';
import { initUtils } from '@/base/utils';
import AppView from '@/views/index.vue';
import Vue from 'vue';
import router from '@/router';
import { currency } from '@/currency';

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
