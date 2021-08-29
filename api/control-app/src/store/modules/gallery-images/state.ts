import { GalleryImage } from "@/models/gallery-image.model";

export default class GalleryImagesState {
  entities: GalleryImage[] = [];
  loading = false;
  error = '';
}
