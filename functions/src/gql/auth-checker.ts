import * as express from 'express'
import * as firebaseAdmin from 'firebase-admin'
import { AuthChecker } from 'type-graphql'
import { Context } from './types'

export const authChecker: AuthChecker<Context> = async (resolverData, roles) => {
  if (process.env.NODE_ENV === 'production') {
    return prodAuthChecker(resolverData, roles)
  } else {
    return devAuthChecker(resolverData, roles)
  }
}

/**
 * 本番環境用の認証チェックを行います。
 * @param resolverData
 * @param roles
 */
const prodAuthChecker: AuthChecker<Context> = async (resolverData, roles) => {
  const idToken = getIdToken(resolverData.context.req)
  if (!idToken) return false

  // IDトークンの検証とデコード
  let decodedIdToken: firebaseAdmin.auth.DecodedIdToken
  try {
    decodedIdToken = await firebaseAdmin.auth().verifyIdToken(idToken)
  } catch (err) {
    console.error('Firebase IDトークンの検証中にエラーが発生しました:', err)
    return false
  }

  // コンテクストにデコードされたIDトークン(ユーザー情報)を設定
  resolverData.context.setUser(decodedIdToken)
  // console.log('decodedIdToken:', decodedIdToken)

  return true
}

/**
 * 開発環境用の認証チェックを行います。
 * @param resolverData
 * @param roles
 */
const devAuthChecker: AuthChecker<Context> = async (resolverData, roles) => {
  const idToken = getIdToken(resolverData.context.req)
  if (!idToken) return false

  // IDトークンの検証とデコード
  let decodedIdToken: firebaseAdmin.auth.DecodedIdToken
  try {
    decodedIdToken = await firebaseAdmin.auth().verifyIdToken(idToken)
  } catch (err) {
    // 開発環境用コード(主に単体テスト用)
    // 単体テストでは認証状態をつくり出すのが難しく暗号化されたIDトークンを生成できないため、
    // JSON形式のIDトークンが送られることを許容している。
    // ここでは送られてきたJSON文字列のIDトークンをパースしている。
    try {
      decodedIdToken = JSON.parse(idToken)
    } catch (err) {
      console.error('Firebase IDトークンの検証中にエラーが発生しました:', err)
      return false
    }
  }

  resolverData.context.setUser(decodedIdToken)
  // console.log('decodedIdToken:', decodedIdToken)

  return true
}

/**
 * リクエストからIDトークンを取得します。
 * @param req
 */
function getIdToken(req: express.Request): string {
  // 認証リクエストがFirebase IDトークンを持っているかチェック
  const authorization = req.headers.authorization as string
  if ((!authorization || !authorization.startsWith('Bearer ')) && !req.cookies.__session) {
    console.error(
      '認証ヘッダーにBearerトークンとしてFirebase IDが渡されませんでした。',
      'HTTPヘッダーの`Authorization: Bearer [Firebase ID Token]`でリクエストを承認するか、',
      'cookieの`__session`で承認を行ってください。'
    )
    return ''
  }

  let idToken
  // 認証ヘッダーにBearerトークンがある場合、認証ヘッダーからIDトークンを取得
  if (authorization && authorization.startsWith('Bearer ')) {
    idToken = authorization.split('Bearer ')[1]
  }
  // 認証ヘッダーにBearerトークンがない場合、cookieからIDトークンを取得
  else {
    idToken = req.cookies.__session
  }
  // console.log('idToken:', idToken)

  return idToken
}