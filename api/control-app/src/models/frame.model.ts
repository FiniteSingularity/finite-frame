export interface FrameState {
  id: number;
  frame: string;
  view: 'P' | 'V' | 'C' | 'R';
  gallery: number;
}

export interface Frame {
  id: string;
  username: string;
  active: boolean;
  frame_location: string;
  state?: FrameState;
}
