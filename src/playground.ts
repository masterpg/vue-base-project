import './styles/polymer-styles.js';
import './index.css';

import * as i18n from './base/i18n';
import Vue from 'vue';
import PlaygroundView from './playground.vue';

(async () => {
  await i18n.init();

  new Vue({
    el: '#app',
    render: (h) => h(PlaygroundView),
    i18n: new i18n.AppI18n(),
  });
})();
