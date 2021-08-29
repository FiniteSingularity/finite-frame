import { Module } from "vuex-smart-module";
import GalleryImagesActions from "./actions";
import GalleryImagesGetters from "./getters";
import GalleryImagesMutations from "./mutations";
import GalleryImagesState from "./state";

const galleryImages = new Module({
  state: GalleryImagesState,
  getters: GalleryImagesGetters,
  mutations: GalleryImagesMutations,
  actions: GalleryImagesActions
});

export default galleryImages;
