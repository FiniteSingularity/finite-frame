import { Module } from "vuex-smart-module";
import GalleriesActions from "./actions";
import GalleriesGetters from "./getters";
import GalleriesMutations from "./mutations";
import GalleriesState from "./state";

const galleries = new Module({
  state: GalleriesState,
  getters: GalleriesGetters,
  mutations: GalleriesMutations,
  actions: GalleriesActions
});

export default galleries;
