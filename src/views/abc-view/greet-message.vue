<style scoped>
@import '../../styles/placeholder/typography.css';

.var-message-color {
  color: var(--comm-red-500);
}

.title {
  @extend %comm-font-subhead1;
  font-weight: 500;
}

.value {
  @extend %comm-font-subhead1;
}
</style>

<template>
  <div class="var-message-color">
    <span class="title">greet times: </span><span class="value">{{ m_greetTimes }}</span>
  </div>
</template>

<script lang="ts">
import { BaseComponent } from '@/base/component';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class GreetMessage extends BaseComponent {
  @Prop()
  message: string;

  m_greetTimes: number = 0;

  greet(): void {
    alert('greeting: ' + this.message);
    this.m_greetTimes++;
  }
}
</script>
