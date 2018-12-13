import Vue from 'vue';

export abstract class Config {
  api: { protocol: string; host: string; port: number } = {
    protocol: '',
    host: '',
    port: 0,
  };
}

function newConfig(): Config {
  switch (process.env.VUE_APP_ENV) {
    case 'development':
      return new DevConfig();
    case 'staging':
      return new StagingConfig();
    case 'production':
      return new ProdConfig();
    default:
      throw new Error('The value set for process.env.VUE_APP_ENV is illegal.');
  }
}

class DevConfig extends Config {}

class StagingConfig extends Config {}

class ProdConfig extends Config {
  readonly api = {
    protocol: 'https',
    host: 'mydomain.net',
    port: 80,
  };
}

export let config: Config;

export function initConfig(): void {
  config = newConfig();
  Object.defineProperty(Vue.prototype, '$config', {
    value: config,
    writable: false,
  });
}
