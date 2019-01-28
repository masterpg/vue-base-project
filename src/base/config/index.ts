import Vue from 'vue'

export interface Config {
  api: {
    protocol: string,
    host: string,
    port: number,
  }
}

class ConfigImpl implements Config {
  readonly api = {
    protocol: String(process.env.VUE_APP_API_PROTOCOL),
    host: String(process.env.VUE_APP_API_HOST),
    port: Number(process.env.VUE_APP_API_PORT),
  };
}

export let config: Config

export function initConfig(): void {
  config = new ConfigImpl()
  Object.defineProperty(Vue.prototype, '$config', {
    value: config,
    writable: false,
  })
}
