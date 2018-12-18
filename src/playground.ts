import '@babel/polyfill';
import '@/styles/polymer-styles.js';
import '@/index.pcss';

import { i18n, initI18n } from '@/base/i18n';
import Vue from 'vue';
import PlaygroundView from '@/playground.vue';

(async () => {
  await initI18n();

  new Vue({
    el: '#app',
    render: (h) => h(PlaygroundView),
    i18n,
  });
})();
