import {GetterTree, MutationTree, ActionTree} from 'vuex'
import {CounterModule, CounterState, RootState} from '@/store/types'

export const counterModule = new class implements CounterModule {
  namespaced = true

  state: CounterState = {
    counter: 1,
  }

  getters: GetterTree<CounterState, RootState> = {
    current(state: CounterState): number {
      return state.counter
    },
  }

  mutations: MutationTree<CounterState> = {
    increment(state: CounterState): void {
      state.counter++
    },
  }

  actions: ActionTree<CounterState, RootState> = {}
}()
