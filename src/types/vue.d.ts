import 'vue';
import { Config } from '@/base/config';
import { Utils } from '@/base/utils';
import { Stores } from '@/stores';

declare module 'vue/types/vue' {
  interface Vue {
    $config: Config;
    $utils: Utils;
    $stores: Stores;
  }
}
