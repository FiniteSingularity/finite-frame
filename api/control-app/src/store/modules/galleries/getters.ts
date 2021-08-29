import { Gallery } from "@/models/gallery.model";
import { Getters } from "vuex-smart-module";
import GalleriesState from "./state";

export default class GalleriesGetters extends Getters<GalleriesState> {
  get all(): Gallery[] {
    return this.state.entities;
  }

  get entities(): { [key: number]: Gallery } {
    const emptyAcc: { [key: number]: Gallery } = {};
    return this.state.entities.reduce((acc, val) => {
      acc[val.id] = val;
      return acc;
    }, emptyAcc);
  }
}
