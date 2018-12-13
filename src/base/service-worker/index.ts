import { register } from 'register-service-worker';
import { i18n } from '@/base/i18n';

//----------------------------------------------------------------------
//
//  Definition
//
//----------------------------------------------------------------------

export enum ChangeState {
  ready = 'ready',
  registered = 'registered',
  cached = 'cached',
  updatefound = 'updatefound',
  updated = 'updated',
  offline = 'offline',
  error = 'error',
}

export type StateChangeLister = (info: StateChangeInfo) => void;

export interface StateChangeInfo {
  state: ChangeState;
  message: string;
}

//----------------------------------------------------------------------
//
//  Variables
//
//----------------------------------------------------------------------

const stateChangeListeners: StateChangeLister[] = [];

//----------------------------------------------------------------------
//
//  Methods
//
//----------------------------------------------------------------------

/**
 * ServiceWorkerの状態が変化した際のリスナを登録します。
 * @param listener
 */
export function addStateChangeListener(listener: StateChangeLister): void {
  stateChangeListeners.push(listener);
}

/**
 * ServiceWorkerの初期化を行います。
 */
export function initServiceWorker(): void {
  if (!('serviceWorker' in navigator)) return;

  const execute = process.env.VUE_APP_ENV === 'production' || process.env.VUE_APP_ENV === 'staging';
  if (!execute) return;

  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      dispatchToListeners(ChangeState.ready, i18n.t('sw.ready') as string);
    },
    registered() {
      dispatchToListeners(ChangeState.registered, i18n.t('sw.registered') as string);
    },
    cached() {
      dispatchToListeners(ChangeState.cached, i18n.t('sw.cached') as string);
    },
    updatefound() {
      dispatchToListeners(ChangeState.updatefound, i18n.t('sw.updatefound') as string);
    },
    updated() {
      dispatchToListeners(ChangeState.updated, i18n.t('sw.updated') as string);
    },
    offline() {
      dispatchToListeners(ChangeState.offline, i18n.t('sw.offline') as string);
    },
    error(error) {
      dispatchToListeners(ChangeState.error, i18n.t('sw.offline', { error }) as string);
    },
  });
}

//----------------------------------------------------------------------
//
//  Internal methods
//
//----------------------------------------------------------------------

/**
 * 登録されているサービスワーカーのイベントリスナーにイベントをディスパッチします。
 * @param state
 * @param message
 */
function dispatchToListeners(state: ChangeState, message: string): void {
  for (const listener of stateChangeListeners) {
    listener({ state, message });
  }
}
