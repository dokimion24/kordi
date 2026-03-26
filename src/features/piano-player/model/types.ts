export interface MidiDeviceInfo {
  id: string;
  name: string;
  manufacturer: string;
  state: "connected" | "disconnected";
}
