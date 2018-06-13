<style lang="stylus" scoped>
  @import '../../../assets/styles/_variables.styl';

  .container {
    @extend .app-shadow-elevation-2dp;
    @extend .app-pa-3;
  }

  .greet-message {
    --greet-message-color: $app-indigo-a700;
  }
</style>


<template>
  <div class="layout vertical">
    <div
      class="container"
      :class="{ 'app-ma-12': pc, 'app-ma-6': tab, 'app-ma-3': sp }"
    >
      <p>message: <input v-model="message"></p>
      <p>propA: {{ propA }}</p>
      <p>propB: {{ propB }}</p>
      <p>message: {{ message }}</p>
      <p>custom propA: {{ customPropA }}</p>
      <p>reversed message: {{ reversedMessage }}</p>
      <p>double reversed message: {{ doubleReversedMessage }}</p>
      <p class="layout horizontal center">
        <greet-message
          ref="greetMessage"
          :message="message"
          class="greet-message"
        ></greet-message>
        <button class="app-ml-3" @click="greetButtonOnClick">Greet</button>
      </p>
      <p class="layout horizontal">
        <custom-input
          v-model="customInputValue"
          class="flex-3"
        ></custom-input>
        <span class="flex-9 app-ml-3">value: {{ customInputValue }}</span>
      </p>
      <p class="layout horizontal center">
        <custom-checkbox
          v-model="customChecked"
        ></custom-checkbox>
        <span class="app-ml-3">checked: {{ customChecked }}</span>
      </p>
      <div class="layout horizontal end-justified">
        <button @click="postButtonOnClick">Post</button>
        <button class="app-ml-2" @click="sleepButtonOnClick">Sleep</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-input/paper-input';
import CustomCheckbox from './custom-checkbox.vue';
import CustomInput from './custom-input.vue';
import GreetMessage from './greet-message.vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { ElementComponent } from '../../components';
import { mixins } from 'vue-class-component';

interface Post {
  title: string;
  message: string;
}

@Component({
  components: {
    'greet-message': GreetMessage,
    'custom-checkbox': CustomCheckbox,
    'custom-input': CustomInput,
  },
})
export default class AbcView extends mixins(ElementComponent) {
  //--------------------------------------------------
  //  props
  //--------------------------------------------------

  // propの初期化は@Propのdefaultで行う

  @Prop({ default: 'prop value A' })
  propA: string;

  @Prop({ default: 'prop value B' })
  propB: string;

  //--------------------------------------------------
  //  data
  //--------------------------------------------------

  // dataは初期化が必要！

  private message: string = '';

  private customInputValue: string = '';

  private customChecked: boolean = false;

  // propの値を初期化に利用できる
  private customPropA: string = 'custom ' + this.propA;

  private post: Post = {
    title: 'Dear Jhon',
    message: '',
  };

  //--------------------------------------------------
  //  computed
  //--------------------------------------------------

  private get reversedMessage() {
    return this.message
      .split('')
      .reverse()
      .join('');
  }

  private get doubleReversedMessage() {
    return this.reversedMessage
      .split('')
      .reverse()
      .join('');
  }

  //--------------------------------------------------
  //  watch
  //--------------------------------------------------

  @Watch('message')
  private messageOnChange(newValue: string, oldValue: string): void {
    // tslint:disable-next-line
    console.log(`messageOnChange: newValue: "${newValue}", oldValue: "${oldValue}"`);
  }

  @Watch('reversedMessage')
  private reversedMessageOnChange(newValue: string, oldValue: string): void {
    // tslint:disable-next-line
    console.log(`reversedMessageOnChange: newValue: "${newValue}", oldValue: "${oldValue}"`);
  }

  @Watch('post', { deep: true })
  private postOnChange(newValue: Post, oldValue: Post): void {
    // tslint:disable-next-line
    console.log('postOnChange: newValue:', newValue, ', oldValue:', oldValue);
  }

  @Watch('post.message')
  private postMessageOnChange(newValue: string, oldValue: string): void {
    // tslint:disable-next-line
    console.log('postMessageOnChange: newValue:', newValue, ', oldValue:', oldValue);
  }

  //--------------------------------------------------
  //  lifecycle hooks
  //--------------------------------------------------

  mounted() {
    this.message = 'mounted';
  }

  //--------------------------------------------------
  //  internal methods
  //--------------------------------------------------

  private async sleep(ms: number): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`I slept for ${ms} ms.`);
      }, ms);
    });
  }

  //--------------------------------------------------
  //  event handlers
  //--------------------------------------------------

  private greetButtonOnClick() {
    this.greetMessage.greet();
  }

  private postButtonOnClick() {
    this.post.message = this.message;
  }

  private async sleepButtonOnClick() {
    alert(await this.sleep(2000));
  }

  //--------------------------------------------------
  //  elements
  //--------------------------------------------------

  private get greetMessage(): GreetMessage {
    return this.$refs.greetMessage as GreetMessage;
  }
}
</script>
