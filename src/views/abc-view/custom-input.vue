<style scoped></style>

<template>
  <div><paper-input @input="m_textFieldOnChange"></paper-input></div>
</template>

<script lang="ts">
import '@polymer/paper-input/paper-input'

import { Component, Prop } from 'vue-property-decorator'
import { BaseComponent } from '@/base/component'
import { mixins } from 'vue-class-component'

@Component
export default class CustomInput extends mixins(BaseComponent) {
  @Prop({ default: '' })
  value: string;

  m_textFieldOnChange(event: Event) {
    // ■ コンポーネントでv-modelを使う
    //    https://jp.vuejs.org/v2/guide/components.html#コンポーネントで-v-model-を使う
    // ・`value`というプロパティ名はv-modelで使用される特別な名前である。
    // ・`input`というイベントはv-modelで使用される特別なイベントである。
    // ・`value`プロパティの値は直接変更できない。例: this.value = 'hoge'
    // ・`value`プロパティの値を変更するには`input`イベントに新しい値を設定してイベントを発火する必要がある。
    const value = (event.target as any).value
    this.$emit('input', value)
  }
}
</script>
