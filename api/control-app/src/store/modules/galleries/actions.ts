import GalleriesGetters from './getters';
import GalleriesMutations from './mutations';
import GalleriesState from './state';

import api$ from '@/services/fsframe-apis';
import { Actions } from 'vuex-smart-module';
import { Gallery } from '@/models/gallery.model';

export default class GalleriesActions extends Actions<
  GalleriesState,
  GalleriesGetters,
  GalleriesMutations,
  GalleriesActions
> {
  loadAll(): Promise<boolean> {
    this.commit('loadAllRequest');
    return api$.get<Gallery[]>('galleries/').then(
      (resp: Gallery[] | undefined) => {
        if(resp) {
          this.commit('loadAllSuccess', { galleries: resp });
          return true;
        }
        return false;
      },
      (err: any) => {
        console.log(err);
        return false;
      }
    );
  }
}
