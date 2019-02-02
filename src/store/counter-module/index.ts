import {GetterTree, MutationTree, ActionTree} from 'vuex'
import {CounterModule, CounterState, CounterTypes, RootState} from '@/store/types'

export const counterModule = new class implements CounterModule {
  namespaced = true

  state: CounterState = {
    counter: 1,
  }

  getters: GetterTree<CounterState, RootState> = {
    [CounterTypes.CURRENT](state: CounterState): number {
      return state.counter
    },
  }

  mutations: MutationTree<CounterState> = {
    [CounterTypes.INCREMENT](state: CounterState): void {
      state.counter++
    },
  }

  actions: ActionTree<CounterState, RootState> = {}
}()
