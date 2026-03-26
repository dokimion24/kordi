export interface ActiveNote {
  midi: number;
  velocity: number;
  source: "midi" | "keyboard" | "mouse";
}
