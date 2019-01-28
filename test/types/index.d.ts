import { APIs } from '@/apis'
import { Stores } from '@/stores'

declare interface TestStore<S> {
  $apis: APIs
  $stores: Stores
}
