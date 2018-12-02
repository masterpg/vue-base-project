//----------------------------------------------------------------------
//
//  Definition
//
//----------------------------------------------------------------------

export enum ChangeState {
  updateIsRequired = 'updateIsRequired',
  cached = 'cached',
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

const m_stateChangeListeners: StateChangeLister[] = [];

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
  m_stateChangeListeners.push(listener);
}

/**
 * ServiceWorkerの初期化を行います。
 */
export function init(): void {
  if (!('serviceWorker' in navigator)) return;

  const prod = process.env.NODE_ENV === 'production';
  if (!prod) return;

  const base = window.document.querySelector('html > head > base') as HTMLBaseElement;
  if (!base) {
    console.error('<base> element not found.');
    return;
  }

  navigator.serviceWorker.register('service-worker.js', { scope: base.href }).then((reg) => {
    // service-worker.jsに変更があった際のハンドラ
    reg.onupdatefound = () => {
      const installingServiceWorker = reg.installing;
      // インストール中のServiceWorkerがなかった場合は処理を終了
      if (!installingServiceWorker) return;
      // ServiceWorkerの状態が変更された際のハンドラ
      installingServiceWorker.onstatechange = () => {
        m_stateChangeFor(installingServiceWorker);
      };
    };
  });
}

//----------------------------------------------------------------------
//
//  Internal methods
//
//----------------------------------------------------------------------

/**
 * ServiceWorkerの状態が変化したかを判定し、登録されているリスナーに通知します。
 *
 * この関数内での判定処理は下記URLを参考にしています:
 * https://github.com/GoogleChromeLabs/sw-precache/blob/master/demo/app/js/service-worker-registration.js
 *
 * @param serviceWorker
 */
function m_stateChangeFor(serviceWorker: ServiceWorker): void {
  let info: StateChangeInfo | undefined;
  switch (serviceWorker.state) {
    case 'installed':
      // この判定では、古いコンテンツが除去され、新しいコンテンツがキャッシュに追加された状態を示す。
      // 必要であれば「新しいコンテンツが利用可能になったのでリフレッシュしてください」とユーザー
      // に促すのに最適な場所である
      if (navigator.serviceWorker.controller) {
        info = {
          state: ChangeState.updateIsRequired,
          message: 'サイトの更新が見つかりました。再読み込みを行ってください。',
        };
      }
      // この判定では、全てのコンテンツがプリキャッシュされた状態を示す。
      // 必要であれば「コンテンツはキャッシュされたのでオフラインで使用できます」とユーザーに
      // 通知するのに最適な場所である。
      else {
        info = {
          state: ChangeState.cached,
          message: 'サイトがオフラインで利用可能な状態になりました。',
        };
      }
      break;
  }
  if (!info) return;
  for (const listener of m_stateChangeListeners) {
    listener(info);
  }
}
