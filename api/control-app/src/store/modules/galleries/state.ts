import { Gallery } from "@/models/gallery.model";

export default class GalleriesState {
  entities: Gallery[] = [];
  loading = false;
  error = '';
}
