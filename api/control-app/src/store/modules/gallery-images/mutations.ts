import { GalleryImage } from "@/models/gallery-image.model";
import { Mutations } from "vuex-smart-module"
import GalleryImagesState from "./state";

export default class GalleryImagesMutations extends Mutations<GalleryImagesState> {
  loadAllRequest() {
    this.state.entities = [];
    this.state.loading = true;
    this.state.error = '';
  }

  loadAllSuccess(payload: { galleryImages: GalleryImage[] }) {
    this.state.entities = payload.galleryImages;
    this.state.loading = false;
    this.state.error = '';
  }
}
