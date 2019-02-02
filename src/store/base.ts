import Vue from 'vue'

export abstract class BaseModule<S> extends Vue {
  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  m_state: S

  get f_state(): S {
    return this.m_state
  }

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  /**
   * Moduleにひも付くStateを初期化します。
   * @param state
   */
  f_initState(state: S): void {
    this.m_state = state
  }
}
