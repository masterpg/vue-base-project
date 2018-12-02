import BreakpointMixin from './breakpoint-mixin';
import cssVarPoly from '../css-var-polyfill';
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

/**
 * コンポーネントの基底クラスです。
 */
@Component
export class BaseComponent extends mixins(BreakpointMixin) {
  get f_pc() {
    return this.f_breakpoint.xl || this.f_breakpoint.lg || this.f_breakpoint.md;
  }

  get f_tab() {
    return this.f_breakpoint.sm;
  }

  get f_sp() {
    return this.f_breakpoint.xs;
  }

  mounted() {
    cssVarPoly.init();
  }
}

/**
 * Mixinのサンプルです。
 * @param superclass
 */
export const SampleMixin = <T extends new (...args: any[]) => {}>(superclass: T) =>
  class extends superclass {
    constructor(...args: any[]) {
      super(args);
    }
  };
