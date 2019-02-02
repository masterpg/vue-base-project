import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import {dateTimeFormats} from '@/base/i18n/date-time-formats'

Vue.use(VueI18n)

interface LocaleData {
  language: string
  country: string
  locale: VueI18n.Locale
}

/**
 * 本プロジェクト用にVueI18nを拡張したクラスです。
 */
export class AppI18n extends VueI18n {
  //----------------------------------------------------------------------
  //
  //  Constructors
  //
  //----------------------------------------------------------------------

  constructor() {
    // スーパークラスのコンスタント呼び出し
    super({
      dateTimeFormats,
    })

    this.m_loadedLanguages = []
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  m_localeData: LocaleData

  m_loadedLanguages: string[]

  //----------------------------------------------------------------------
  //
  //  Methods
  //
  //----------------------------------------------------------------------

  d(value: number | Date, key?: VueI18n.Path, locale?: VueI18n.Locale): VueI18n.DateTimeFormatResult
  d(value: number | Date, args?: {[key: string]: string}): VueI18n.DateTimeFormatResult
  d(arg1: number | Date, arg2?: any, arg3?: any): VueI18n.DateTimeFormatResult {
    let locale: VueI18n.Locale
    // 引数にロケールが指定された場合
    if (arg3 && typeof arg3 === 'string') {
      // 指定されたロケールからロケールデータを作成
      const localeData = LocaleUtil.createLocaleData(arg3)
      // "en-US"や"ja-JP"などを設定
      locale = localeData.locale
    }
    // 上記以外の場合
    else {
      // ブラウザから取得されたロケールを設定
      locale = this.m_localeData.locale
    }
    return super.d(arg1, arg2, locale)
  }

  /**
   * 言語リソースを読み込みます。
   */
  async load(): Promise<void> {
    const localeData = this.m_getLocaleData()
    const currentLanguage = this.m_localeData ? this.m_localeData.language : ''
    const newLanguage = localeData.language
    if (currentLanguage !== newLanguage) {
      if (this.m_loadedLanguages.indexOf(newLanguage) === -1) {
        const msgs = await import(/* webpackChunkName: "lang-[request]" */ `@/lang/${newLanguage}`)
        this.setLocaleMessage(newLanguage, msgs.default)
      }
    }
    this.m_setLanguage(localeData)
  }

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  /**
   * ロケールデータを取得します。
   */
  m_getLocaleData(): LocaleData {
    // ブラウザから言語+国を取得("en"や"en-US"などを取得)
    const locale =
      (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language ||
      (window.navigator as any).userLanguage ||
      (window.navigator as any).browserLanguage
    // 取得した言語+国からロケールデータを作成
    return LocaleUtil.createLocaleData(locale)
  }

  /**
   * ロケールデータの設定を行います。
   * @param localeData
   */
  m_setLanguage(localeData: LocaleData): void {
    this.locale = localeData.language
    axios.defaults.headers.common['Accept-Language'] = localeData.language
    document.querySelector('html')!.setAttribute('lang', localeData.language)

    this.m_localeData = localeData
    this.m_loadedLanguages = this.m_loadedLanguages || []
    if (this.m_loadedLanguages.indexOf(localeData.language) === -1) {
      this.m_loadedLanguages = [localeData.language]
    }
  }
}

/**
 * ロケールを操作するためのユーティリティクラスです。
 */
class LocaleUtil {
  /**
   * ロケールデータを作成します。
   * @param locale
   */
  static createLocaleData(locale: VueI18n.Locale): LocaleData {
    // 言語+国("en-US")を分割
    const localeArray = locale.split('-')
    let language: string
    let country: string
    // 言語+国が空だった場合
    if (localeArray.length === 0) {
      // デフォルトの言語と国を取得
      language = 'en'
      country = LocaleUtil.m_getDefaultCountry(language)
    }
    // 言語+国が設定されていた場合
    else {
      // 言語を取得
      language = localeArray[0]
      // 国を取得(国が指定されていなかった場合はデフォルトの国が取得される)
      if (localeArray.length === 2) {
        country = LocaleUtil.m_getDefaultCountry(language, localeArray[1])
      } else {
        country = LocaleUtil.m_getDefaultCountry(language)
      }
    }
    return {language, country, locale: `${language}-${country}`}
  }

  /**
   * 指定された言語と国からデフォルトの国を取得します。
   * @param language
   * @param country
   */
  static m_getDefaultCountry(language: string, country?: string): string {
    // 国が指定されている場合はその国を返す
    if (country) {
      return country.toUpperCase()
    }
    // 国が指定されていなかった場合、言語をもとにデフォルトの国を返す
    switch (language) {
      case 'en':
        return 'US'
      case 'ja':
        return 'JP'
      default:
        return 'US'
    }
  }
}

export let i18n: AppI18n

export async function initI18n(): Promise<void> {
  i18n = new AppI18n()
  await i18n.load()
}
