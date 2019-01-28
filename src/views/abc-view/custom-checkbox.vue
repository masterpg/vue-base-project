<style scoped></style>

<template>
  <div><input type="checkbox" :checked="checked" @change="m_checkboxOnChange" /></div>
</template>

<script lang="ts">
import { BaseComponent } from '@/base/component'
import { Component, Model } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

@Component
export default class CustomCheckbox extends mixins(BaseComponent) {
  @Model('change')
  checked: boolean = false;

  m_checkboxOnChange(event: Event) {
    // ■ v-modelを使ったコンポーネントのカスタマイズ
    //    https://jp.vuejs.org/v2/guide/components-custom-events.html#v-model-を使ったコンポーネントのカスタマイズ
    // ・`value`というプロパティ名はv-modelで使用される特別な名前である。
    // ・`input`というイベントはv-modelで使用される特別なイベントである。
    // ・ただしチェックボックスやラジオボタンでは`value`を別の目的で使用するため、
    //   v-modelは`value`というプロパティ名を使用できない。
    // ・このような場合は@Modelでv-modelで使用するプロパティ名とイベント名を指定する
    // ・本コンポーネントでは以下のようにプロパティ名とイベント名を設定した:
    //   ・プロパティ名: 'checked'
    //   ・イベント名: 'change'
    const checkboxEl = event.target as HTMLInputElement
    this.$emit('change', checkboxEl.checked)
  }
}
</script>
