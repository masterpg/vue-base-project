import { APIs } from '../../src/apis';
import { Stores } from '../../src/stores';

declare interface TestStore<S> {
  $apis: APIs;
  $stores: Stores;
}
