<style scoped>
.hello-world-color {
  color: var(--comm-indigo-a200);
}
</style>

<template>
  <paper-card class="layout vertical comm-pa-20" :class="{ 'comm-ma-48': f_pc, 'comm-ma-24': f_tab, 'comm-ma-12': f_sp }">
    <div class="hello-world-color">{{ $t('hello', { today: $d(new Date(), 'short') }) }}</div>
    <div class="layout horizontal end-justified comm-mt-10"><paper-button raised @click="m_sleepButtonOnClick">Sleep</paper-button></div>
  </paper-card>
</template>

<script lang="ts">
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';
import { BaseComponent } from '@/base/component';
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

@Component
export default class PlaygroundView extends mixins(BaseComponent) {
  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  async m_sleep(ms: number): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`I slept for ${ms} ms.`);
      }, ms);
    });
  }

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  async m_sleepButtonOnClick() {
    alert(await this.m_sleep(2000));
  }
}
</script>

<i18n>
en:
  hello: "Hello World! Today is {today}."
ja:
  hello: "こんにちは、世界！ 今日は {today} です。"
</i18n>
