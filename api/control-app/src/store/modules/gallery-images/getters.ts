import { GalleryImage } from "@/models/gallery-image.model";
import { Getters } from "vuex-smart-module";
import GalleryImagesState from "./state";

export default class GalleryImageGetters extends Getters<GalleryImagesState> {
  get all(): GalleryImage[] {
    return this.state.entities;
  }

  get entities(): { [key: number]: GalleryImage } {
    const emptyAcc: { [key: number]: GalleryImage } = {};
    return this.state.entities.reduce((acc, val) => {
      acc[val.id] = val;
      return acc;
    }, emptyAcc);
  }
}
