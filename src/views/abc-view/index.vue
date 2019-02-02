<style scoped>
@import '../../styles/placeholder/typography.css';

.greet-message {
  --greet-message-color: var(--comm-indigo-a200);
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
  <div class="layout vertical">
    <paper-card class="comm-pa-12" :class="{'comm-ma-48': f_pc, 'comm-ma-24': f_tab, 'comm-ma-12': f_sp}">
      <div class="comm-my-16">{{ $t('hello', {today: $d(new Date(), 'short')}) }}</div>
      <paper-input label="Input Message" :value="m_message" @input="m_message = $event.target.value"></paper-input>
      <div class="comm-my-16">
        <span class="title">propA: </span><span class="value">{{ propA }}</span>
      </div>
      <div class="comm-my-16">
        <span class="title">propB: </span><span class="value">{{ propB }}</span>
      </div>
      <div class="comm-my-16">
        <span class="title">message: </span><span class="value">{{ m_message }}</span>
      </div>
      <div class="comm-my-16">
        <span class="title">custom propA: </span><span class="value">{{ m_customPropA }}</span>
      </div>
      <div class="comm-my-16">
        <span class="title">reversed message: </span> <span class="value">{{ m_reversedMessage }}</span>
      </div>
      <div class="comm-my-16">
        <span class="title">double reversed message: </span> <span class="value">{{ m_doubleReversedMessage }}</span>
      </div>
      <div class="layout horizontal center comm-my-16">
        <greet-message ref="greetMessage" :message="m_message" class="greet-message"></greet-message>
        <button class="comm-ml-12" @click="m_greetButtonOnClick">Greet</button>
      </div>
      <div class="comm-my-16">
        <span class="title">post times: </span><span class="value">{{ m_post.times }}</span>
        <button class="comm-ml-12" @click="m_postButtonOnClick">Post</button>
      </div>
      <div class="layout horizontal comm-my-16">
        <custom-input v-model="m_customInputValue" class="flex-3"></custom-input>
        <span class="flex-9 comm-ml-12 comm-mt-28">
          <span class="title">value: </span><span class="value">{{ m_customInputValue }}</span>
        </span>
      </div>
      <div class="layout horizontal center comm-my-16">
        <custom-checkbox v-model="m_customChecked"></custom-checkbox>
        <span class="comm-ml-12">
          <span class="title">checked: </span><span class="value">{{ m_customChecked }}</span>
        </span>
      </div>
      <div class="layout horizontal end-justified">
        <paper-button raised @click="m_incrementButtonOnClick">Increment</paper-button>
        <paper-button raised @click="m_sleepButtonOnClick">Sleep</paper-button>
      </div>
    </paper-card>
  </div>
</template>

<script lang="ts">
import '@polymer/paper-button/paper-button'
import '@polymer/paper-card/paper-card'
import '@polymer/paper-input/paper-input'

import CustomCheckbox from '@/views/abc-view/custom-checkbox.vue'
import CustomInput from '@/views/abc-view/custom-input.vue'
import GreetMessage from '@/views/abc-view/greet-message.vue'
import {BaseComponent} from '@/base/component'
import {Component, Prop, Watch} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'

import {namespace} from 'vuex-class'
import {CounterTypes} from '@/store'

interface Post {
  message: string
  times: number
}

const counterModule = namespace(CounterTypes.PATH)

@Component({
  components: {
    'greet-message': GreetMessage,
    'custom-checkbox': CustomCheckbox,
    'custom-input': CustomInput,
  },
})
export default class AbcView extends mixins(BaseComponent) {
  //--------------------------------------------------
  //  props
  //--------------------------------------------------

  // propの初期化は@Propのdefaultで行う

  @Prop({default: 'prop value A'})
  propA: string

  @Prop({default: 'prop value B'})
  propB: string

  //--------------------------------------------------
  //  data
  //--------------------------------------------------

  // dataは初期化が必要！

  m_message: string = ''

  m_customInputValue: string = ''

  m_customChecked: boolean = false

  // propの値を初期化に利用できる
  m_customPropA: string = 'custom ' + this.propA

  m_post: Post = {
    message: '',
    times: 0,
  }

  //--------------------------------------------------
  //  computed
  //--------------------------------------------------

  get m_reversedMessage() {
    return this.m_message
      .split('')
      .reverse()
      .join('')
  }

  get m_doubleReversedMessage() {
    return this.m_reversedMessage
      .split('')
      .reverse()
      .join('')
  }

  //--------------------------------------------------
  //  watch
  //--------------------------------------------------

  @Watch('m_message')
  m_messageOnChange(newValue: string, oldValue: string): void {
    console.log(`m_messageOnChange: newValue: "${newValue}", oldValue: "${oldValue}"`)
  }

  @Watch('m_reversedMessage')
  m_reversedMessageOnChange(newValue: string, oldValue: string): void {
    console.log(`m_reversedMessageOnChange: newValue: "${newValue}", oldValue: "${oldValue}"`)
  }

  @Watch('m_post', {deep: true})
  m_postOnChange(newValue: Post, oldValue: Post): void {
    console.log('m_postOnChange: newValue:', newValue, ', oldValue:', oldValue)
  }

  @Watch('m_post.times')
  m_postTimesOnChange(newValue: string, oldValue: string): void {
    console.log('m_postTimesOnChange: newValue:', newValue, ', oldValue:', oldValue)
  }

  //--------------------------------------------------
  //  lifecycle hooks
  //--------------------------------------------------

  mounted() {
    this.m_message = 'mounted'
  }

  //--------------------------------------------------
  //  internal methods
  //--------------------------------------------------

  async m_sleep(ms: number): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`I slept for ${ms} ms.`)
      }, ms)
    }) as Promise<string>
  }

  //--------------------------------------------------
  //  event handlers
  //--------------------------------------------------

  m_greetButtonOnClick() {
    this.m_greetMessage.greet()
  }

  m_postButtonOnClick() {
    this.m_post.message = this.m_message
    this.m_post.times++
  }

  async m_sleepButtonOnClick() {
    alert(await this.m_sleep(2000))
  }

  async m_incrementButtonOnClick() {
    this.$appStore.counter.increment()
    console.log(this.$appStore.counter.current)
  }

  //--------------------------------------------------
  //  elements
  //--------------------------------------------------

  get m_greetMessage(): GreetMessage {
    return this.$refs.greetMessage as GreetMessage
  }
}
</script>

<i18n>
en:
  hello: "Hello World! Today is {today}."
ja:
  hello: "こんにちは、世界！ 今日は {today} です。"
</i18n>
