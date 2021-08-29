import { Frame } from "@/models/frame.model";
import { Getters } from "vuex-smart-module";
import FramesState from "./state";

export default class FramesGetters extends Getters<FramesState> {
  get all(): Frame[] {
    return this.state.entities;
  }

  get entities(): { [key: string]: Frame } {
    const emptyAcc: { [key: string]: Frame } = {};
    return this.state.entities.reduce((acc, val) => {
      acc[val.id] = val;
      return acc;
    }, emptyAcc);
  }
}
