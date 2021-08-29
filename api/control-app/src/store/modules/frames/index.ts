import { Module } from "vuex-smart-module";
import FramesActions from "./actions";
import FramesGetters from "./getters";
import FramesMutations from "./mutations";
import FramesState from "./state";

const frames = new Module({
  state: FramesState,
  getters: FramesGetters,
  mutations: FramesMutations,
  actions: FramesActions
});

export default frames;
