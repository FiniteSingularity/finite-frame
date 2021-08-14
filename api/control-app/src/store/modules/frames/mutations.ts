import { Frame, FrameState } from "@/models/frame.model";
import { Mutations } from "vuex-smart-module"
import FramesState from './state';

export default class FramesMutations extends Mutations<FramesState> {
  loadAllRequest() {
    this.state.entities = [];
    this.state.loading = true;
    this.state.error = '';
  }

  loadAllSuccess(payload: { frames: Frame[] }) {
    this.state.entities = payload.frames;
    this.state.loading = false;
    this.state.error = '';
  }

  createOne(payload: Frame) {
    this.state.entities = [payload, ...this.state.entities];
  }

  updateFrameState(payload: FrameState ) {
    const entityId = this.state.entities.findIndex(frame => frame.id === payload.frame);
    if (entityId > -1) {
      const frame = this.state.entities[entityId];
      frame.state = payload;
      this.state.entities = [
        ...this.state.entities.slice(0, entityId),
        {...frame},
        ...this.state.entities.slice(entityId + 1)
      ];
    }
  }
}
