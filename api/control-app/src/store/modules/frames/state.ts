import { Frame } from "@/models/frame.model";

export default class FramesState {
  entities: Frame[] = [];
  loading = false;
  error = '';
}
