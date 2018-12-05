import Vue from 'vue';
import { clone, cloneDeep, assign, assignIn } from 'lodash';

export class Utils {
  /**
   * 指定されたオブジェクトのディープコピーを返します。
   * @param source
   * @returns
   */
  cloneDeep<T>(source: T): T {
    return cloneDeep(source);
  }

  /**
   * 指定されたオブジェクトのシャローコピーを返します。
   * @param source
   * @returns
   */
  cloneShallow<T>(source: T): T {
    return clone(source);
  }

  assign<TObject, TSource>(object: TObject, source: TSource): TObject & TSource;

  assign<TObject, TSource1, TSource2>(object: TObject, source1: TSource1, source2: TSource2): TObject & TSource1 & TSource2;

  assign<TObject, TSource1, TSource2, TSource3>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3,
  ): TObject & TSource1 & TSource2 & TSource3;

  assign<TObject, TSource1, TSource2, TSource3, TSource4>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3,
    source4: TSource4,
  ): TObject & TSource1 & TSource2 & TSource3 & TSource4;

  assign<TObject, TSource1, TSource2, TSource3, TSource4, TSource5>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3,
    source4: TSource4,
    source5: TSource5,
  ): TObject & TSource1 & TSource2 & TSource3 & TSource4 & TSource5;

  /**
   * sourcesで指定されたオブジェクトをobjectへ割り当てます。
   * sourcesは左から右に適用されます。後続のsourcesは前のオブジェクトのプロパティを上書きします。
   * このメソッドは引数のobject自身を変更します。
   *
   * @param object 適用先のオブジェクトを指定
   * @param sources ソースオブジェクトを指定
   * @return 引数のobjectを返す
   */
  assign<T = any>(object: any, ...sources: any[]): T {
    return assign(object, ...sources);
  }

  assignIn<TObject, TSource>(object: TObject, source: TSource): TObject & TSource;

  assignIn<TObject, TSource1, TSource2>(object: TObject, source1: TSource1, source2: TSource2): TObject & TSource1 & TSource2;

  assignIn<TObject, TSource1, TSource2, TSource3>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3,
  ): TObject & TSource1 & TSource2 & TSource3;

  assignIn<TObject, TSource1, TSource2, TSource3, TSource4>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3,
    source4: TSource4,
  ): TObject & TSource1 & TSource2 & TSource3 & TSource4;

  assignIn<TObject, TSource1, TSource2, TSource3, TSource4, TSource5>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3,
    source4: TSource4,
    source5: TSource5,
  ): TObject & TSource1 & TSource2 & TSource3 & TSource4 & TSource5;

  /**
   * このメソッドは`assign()`とほとんど同じ動作をします。
   * 異なるのは、sourceが継承したオブジェクトのプロパティもobjectへ割り当てる点になります。
   * assign()と異なる点は、
   *
   * @param object 適用先のオブジェクトを指定
   * @param sources ソースオブジェクトを指定
   * @return 引数のobjectを返す
   */
  assignIn<T = any>(object: any, ...sources: any[]): T {
    return assignIn(object, ...sources);
  }
}

export function init(): void {
  Object.defineProperty(Vue.prototype, '$utils', {
    value: new Utils(),
    writable: false,
  });
}
