import '@/styles/polymer/polymer-styles.js'
import '@/index.css'

import {i18n, initI18n} from '@/base/i18n'
import Vue from 'vue'
import PlaygroundView from '@/playground.vue'

async function init() {
  await initI18n()

  new Vue({
    el: '#app',
    render: h => h(PlaygroundView),
    i18n,
  })
}
init()
