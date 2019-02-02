import 'vue'
import {Config} from '@/base/config'
import {Utils} from '@/base/utils'
import {AppStore} from '@/store'

declare module 'vue/types/vue' {
  interface Vue {
    $config: Config
    $utils: Utils
    $appStore: AppStore
  }
}
