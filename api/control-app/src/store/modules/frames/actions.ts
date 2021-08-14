import FrameGetters from './getters';
import FramesMutations from './mutations';
import FramesState from './state';

import api$ from '@/services/fsframe-apis';
import { Frame, FrameState } from '@/models/frame.model';
import { Actions } from 'vuex-smart-module';
import FramesGetters from './getters';

export default class FramesActions extends Actions<
  FramesState,
  FramesGetters,
  FramesMutations,
  FramesActions
> {
  loadAll(): Promise<boolean> {
    this.commit('loadAllRequest');
    return api$.get<Frame[]>('frames/').then(
      (resp: Frame[] | undefined) => {
        if(resp) {
          this.commit('loadAllSuccess', { frames: resp });
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

  updateFrameState(payload: Frame): Promise<boolean> {
    return api$.put<FrameState>(
      `frames/states/${payload.username}/`,
      payload.state
    ).then(
      (resp: FrameState | undefined) => {
        if(resp) {
          this.commit('updateFrameState', resp);
          return true;
        }
        return false;
      },
      (err: any) => {
        console.log(err);
        return false;
      }
    )
  }
}
