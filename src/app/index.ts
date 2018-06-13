import '../assets/styles/main.styl';

import * as apis from './apis';
import * as config from './config';
import * as stores from './stores';
import * as sw from './service-worker';
import * as utils from './utils';
import AppView from './views/index.vue';
import Vue from 'vue';
import router from './router';
import { currency } from './currency';

config.init();
utils.init();
sw.init();
apis.init();
stores.init();

Vue.filter('currency', currency);

new Vue({
  el: '#app',
  router,
  render: (h) => h(AppView),
});
