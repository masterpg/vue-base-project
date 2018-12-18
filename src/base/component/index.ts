import BreakpointMixin from '@/base/component/breakpoint-mixin';
import { Component } from 'vue-property-decorator';
import { NoCache } from '@/base/component/decorators';
import { mixins } from 'vue-class-component';

/**
 * コンポーネントの基底クラスです。
 */
@Component
class BaseComponent extends mixins(BreakpointMixin) {
  get f_pc() {
    return this.f_breakpoint.xl || this.f_breakpoint.lg || this.f_breakpoint.md;
  }

  get f_tab() {
    return this.f_breakpoint.sm;
  }

  get f_sp() {
    return this.f_breakpoint.xs;
  }

  m_polymerStyleTemplate: HTMLTemplateElement | undefined | null;

  m_polymerStyle: string | undefined | null;

  get f_polymerStyle(): string | undefined | null {
    return this.m_polymerStyle;
  }

  set f_polymerStyle(style: string | undefined | null) {
    this.m_polymerStyle = style;

    if (this.m_polymerStyleTemplate) {
      document.head.removeChild(this.m_polymerStyleTemplate);
    }
    this.m_polymerStyleTemplate = undefined;

    if (this.m_polymerStyle) {
      this.m_polymerStyleTemplate = document.createElement('template');
      this.m_polymerStyleTemplate.setAttribute('style', 'display: none;');
      this.m_polymerStyleTemplate.innerHTML = `
        <custom-style>
          ${this.m_polymerStyle}
        </custom-style>
      `;
      document.head.appendChild(this.m_polymerStyleTemplate.content);
    }
  }

  mounted() {}
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

export { BaseComponent, NoCache };
