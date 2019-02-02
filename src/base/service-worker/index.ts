import {register} from 'register-service-worker'
import {i18n} from '@/base/i18n'

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

export type StateChangeLister = (info: StateChangeInfo) => void

export interface StateChangeInfo {
  state: ChangeState
  message: string
}

//----------------------------------------------------------------------
//
//  Variables
//
//----------------------------------------------------------------------

const stateChangeListeners: StateChangeLister[] = []

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
  stateChangeListeners.push(listener)
}

/**
 * ServiceWorkerの初期化を行います。
 */
export function initServiceWorker(): void {
  if (!('serviceWorker' in navigator)) return

  const execute = process.env.NODE_ENV === 'production'
  if (!execute) return

  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      dispatchToListeners(ChangeState.ready, String(i18n.t('sw.ready')))
    },
    registered() {
      dispatchToListeners(ChangeState.registered, String(i18n.t('sw.registered')))
    },
    cached() {
      dispatchToListeners(ChangeState.cached, String(i18n.t('sw.cached')))
    },
    updatefound() {
      dispatchToListeners(ChangeState.updatefound, String(i18n.t('sw.updatefound')))
    },
    updated() {
      dispatchToListeners(ChangeState.updated, String(i18n.t('sw.updated')))
    },
    offline() {
      dispatchToListeners(ChangeState.offline, String(i18n.t('sw.offline')))
    },
    error(error) {
      dispatchToListeners(ChangeState.error, String(i18n.t('sw.offline', {error})))
    },
  })
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
    listener({state, message})
  }
}
