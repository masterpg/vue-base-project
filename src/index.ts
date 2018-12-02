import './styles/polymer-styles.js';
import './index.css';

import * as apis from './apis';
import * as config from './base/config';
import * as i18n from './base/i18n';
import * as stores from './stores';
import * as sw from './base/service-worker';
import * as utils from './base/utils';
import AppView from './views/index.vue';
import Vue from 'vue';
import router from './router';
import { currency } from './currency';

(async () => {
  utils.init();
  config.init();
  sw.init();
  apis.init();
  stores.init();
  await i18n.init();

  Vue.filter('currency', currency);

  new Vue({
    el: '#app',
    router,
    render: (h) => h(AppView),
    i18n: new i18n.AppI18n(),
  });
})();
