import Vue from 'vue'
import {Component} from 'vue-property-decorator'

export enum BreakpointName {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export interface BreakpointInfo {
  name: BreakpointName
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  xsOnly: boolean
  smOnly: boolean
  smAndDown: boolean
  smAndUp: boolean
  mdOnly: boolean
  mdAndDown: boolean
  mdAndUp: boolean
  lgOnly: boolean
  lgAndDown: boolean
  lgAndUp: boolean
  xlOnly: boolean
  width: number
  height: number
}

@Component
export default class BreakpointMixin extends Vue {
  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  m_clientWidth: number = this.m_getClientDimensionsWidth()
  m_clientHeight: number = this.m_getClientDimensionsHeight()
  m_resizeTimeout: number = 0

  get f_breakpoint(): BreakpointInfo {
    const xs = this.m_clientWidth < 600
    const sm = this.m_clientWidth < 960 && !xs
    const md = this.m_clientWidth < 1280 - 16 && !(sm || xs)
    const lg = this.m_clientWidth < 1920 - 16 && !(md || sm || xs)
    const xl = this.m_clientWidth >= 1920 - 16 && !(lg || md || sm || xs)

    const xsOnly = xs
    const smOnly = sm
    const smAndDown = (xs || sm) && !(md || lg || xl)
    const smAndUp = !xs && (sm || md || lg || xl)
    const mdOnly = md
    const mdAndDown = (xs || sm || md) && !(lg || xl)
    const mdAndUp = !(xs || sm) && (md || lg || xl)
    const lgOnly = lg
    const lgAndDown = (xs || sm || md || lg) && !xl
    const lgAndUp = !(xs || sm || md) && (lg || xl)
    const xlOnly = xl

    let name: BreakpointName
    switch (true) {
      case xs:
        name = BreakpointName.xs
        break
      case sm:
        name = BreakpointName.sm
        break
      case md:
        name = BreakpointName.md
        break
      case lg:
        name = BreakpointName.lg
        break
      default:
        name = BreakpointName.xl
        break
    }

    const result: BreakpointInfo = {
      // Definite breakpoint.
      xs,
      sm,
      md,
      lg,
      xl,

      // Useful e.g. to construct CSS class names dynamically.
      name,

      // Breakpoint ranges.
      xsOnly,
      smOnly,
      smAndDown,
      smAndUp,
      mdOnly,
      mdAndDown,
      mdAndUp,
      lgOnly,
      lgAndDown,
      lgAndUp,
      xlOnly,

      // For custom breakpoint logic.
      width: this.m_clientWidth,
      height: this.m_clientHeight,
    }

    return result
  }

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  mounted() {
    window.addEventListener('resize', this.m_windowOnResize, {passive: true})
  }

  destroyed() {
    window.removeEventListener('resize', this.m_windowOnResize)
  }

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  m_windowOnResize() {
    clearTimeout(this.m_resizeTimeout)

    // Added debounce to match what
    // v-resize used to do but was
    // removed due to a memory leak
    // https://github.com/vuetifyjs/vuetify/pull/2997
    this.m_resizeTimeout = window.setTimeout(() => {
      this.m_clientWidth = this.m_getClientDimensionsWidth()
      this.m_clientHeight = this.m_getClientDimensionsHeight()
    }, 200)
  }

  // Cross-browser support as described in:
  // https://stackoverflow.com/questions/1248081
  m_getClientDimensionsWidth(): number {
    if (typeof document === 'undefined') return 0 // SSR
    return Math.max(document.documentElement!.clientWidth, window.innerWidth || 0)
  }

  // Cross-browser support as described in:
  // https://stackoverflow.com/questions/1248081
  m_getClientDimensionsHeight(): number {
    if (typeof document === 'undefined') return 0 // SSR
    return Math.max(document.documentElement!.clientHeight, window.innerHeight || 0)
  }
}
