import { Gallery } from "@/models/gallery.model";
import { Mutations } from "vuex-smart-module";
import GalleriesState from "./state";

export default class GalleriesMutations extends Mutations<GalleriesState> {
  loadAllRequest() {
    this.state.entities = [];
    this.state.loading = true;
    this.state.error = '';
  }

  loadAllSuccess(payload: { galleries: Gallery[] }) {
    this.state.entities = payload.galleries;
    this.state.loading = false;
    this.state.error = '';
  }
}
