import VueI18n from 'vue-i18n';
import Vue from 'vue';
import { dateTimeFormats } from '@/base/i18n/date-time-formats';

Vue.use(VueI18n);

interface LocaleData {
  language: string;
  country: string;
  locale: VueI18n.Locale;
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
    // ブラウザから言語+国を取得("en"や"en-US"などを取得)
    const locale =
      (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language ||
      (window.navigator as any).userLanguage ||
      (window.navigator as any).browserLanguage;
    // 取得した言語+国からロケールデータを作成
    const localeData = LocaleUtil.createLocaleData(locale);

    // スーパークラスのコンスタント呼び出し
    super({
      locale: localeData.language, // "en"や"ja"など
      dateTimeFormats,
    });

    this.m_localeData = localeData;
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  m_localeData: LocaleData;

  //----------------------------------------------------------------------
  //
  //  Methods
  //
  //----------------------------------------------------------------------

  d(value: number | Date, key?: VueI18n.Path, locale?: VueI18n.Locale): VueI18n.DateTimeFormatResult;
  d(value: number | Date, args?: { [key: string]: string }): VueI18n.DateTimeFormatResult;
  d(arg1: number | Date, arg2?: any, arg3?: any): VueI18n.DateTimeFormatResult {
    let locale: VueI18n.Locale;
    // 引数にロケールが指定された場合
    if (arg3 && typeof arg3 === 'string') {
      // 指定されたロケールからロケールデータを作成
      const localeData = LocaleUtil.createLocaleData(arg3);
      // "en-US"や"ja-JP"などを設定
      locale = localeData.locale;
    }
    // 上記以外の場合
    else {
      // ブラウザから取得されたロケールを設定
      locale = this.m_localeData.locale;
    }
    return super.d(arg1, arg2, locale);
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
    const localeArray = locale.split('-');
    let language: string;
    let country: string;
    // 言語+国が空だった場合
    if (localeArray.length === 0) {
      // デフォルトの言語と国を取得
      language = 'en';
      country = LocaleUtil.m_getDefaultCountry(language);
    }
    // 言語+国が設定されていた場合
    else {
      // 言語を取得
      language = localeArray[0];
      // 国を取得(国が指定されていなかった場合はデフォルトの国が取得される)
      if (localeArray.length === 2) {
        country = LocaleUtil.m_getDefaultCountry(language, localeArray[1]);
      } else {
        country = LocaleUtil.m_getDefaultCountry(language);
      }
    }
    return { language, country, locale: `${language}-${country}` };
  }

  /**
   * 指定された言語と国からデフォルトの国を取得します。
   * @param language
   * @param country
   */
  static m_getDefaultCountry(language: string, country?: string): string {
    // 国が指定されている場合はその国を返す
    if (country) {
      return country.toUpperCase();
    }
    // 国が指定されていなかった場合、言語をもとにデフォルトの国を返す
    switch (language) {
      case 'en':
        return 'US';
      case 'ja':
        return 'JP';
      default:
        return 'US';
    }
  }
}

export let i18n: VueI18n;

export async function initI18n(): Promise<void> {
  i18n = new AppI18n();
}
