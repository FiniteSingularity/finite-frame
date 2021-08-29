import { Actions } from "vuex-smart-module";
import GalleryImagesState from "./state";
import GalleryImagesGetters from './getters';
import GalleryImagesMutations from './mutations';

import api$ from '@/services/fsframe-apis';
import { GalleryImage } from "@/models/gallery-image.model";

export default class GalleryImagesActions extends Actions<
  GalleryImagesState,
  GalleryImagesGetters,
  GalleryImagesMutations,
  GalleryImagesActions
> {
  loadAll(id: number): Promise<boolean> {
    this.commit('loadAllRequest');
    return api$.get<GalleryImage[]>(`galleries/${id}/pictures/`).then(
      (resp: GalleryImage[] | undefined) => {
        if(resp) {
          this.commit('loadAllSuccess', { galleryImages: resp });
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
