"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCallbackRef } from "@/shared/lib/react/use-callback-ref";
import type { MidiDeviceInfo } from "../model/types";

const CC_SUSTAIN_PEDAL = 64;

interface UseMidiInputOptions {
  onNoteOn: (midi: number, velocity: number) => void;
  onNoteOff: (midi: number) => void;
  onSustainChange?: (on: boolean) => void;
  enabled?: boolean;
}

export function useMidiInput({
  onNoteOn,
  onNoteOff,
  onSustainChange,
  enabled = true,
}: UseMidiInputOptions) {
  const [devices, setDevices] = useState<MidiDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const midiAccessRef = useRef<MIDIAccess | null>(null);
  const onNoteOnRef = useCallbackRef(onNoteOn);
  const onNoteOffRef = useCallbackRef(onNoteOff);
  const onSustainChangeRef = useCallbackRef(onSustainChange);

  const updateDevices = useCallback((access: MIDIAccess) => {
    const infos: MidiDeviceInfo[] = [];
    access.inputs.forEach((input) => {
      infos.push({
        id: input.id,
        name: input.name ?? "Unknown Device",
        manufacturer: input.manufacturer ?? "Unknown",
        state: input.state,
      });
    });
    setDevices(infos);

    // Auto-select first connected device
    if (infos.length > 0) {
      setSelectedDeviceId((prev) => {
        if (prev && infos.some((d) => d.id === prev)) return prev;
        return infos[0].id;
      });
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (typeof navigator === "undefined" || !navigator.requestMIDIAccess) return;

    let cancelled = false;

    navigator.requestMIDIAccess().then((access) => {
      if (cancelled) return;
      midiAccessRef.current = access;
      updateDevices(access);

      access.onstatechange = () => {
        updateDevices(access);
      };
    }).catch(() => {
      // MIDI not available
    });

    return () => {
      cancelled = true;
    };
  }, [enabled, updateDevices]);

  // Attach MIDI message handler to selected device
  useEffect(() => {
    if (!selectedDeviceId || !midiAccessRef.current) return;

    const input = midiAccessRef.current.inputs.get(selectedDeviceId);
    if (!input) return;

    function handleMessage(e: MIDIMessageEvent) {
      const [status, data1, data2] = e.data!;
      const command = status & 0xf0;

      if (command === 0x90 && data2 > 0) {
        onNoteOnRef.current(data1, data2 / 127);
      } else if (command === 0x80 || (command === 0x90 && data2 === 0)) {
        onNoteOffRef.current(data1);
      } else if (command === 0xb0 && data1 === CC_SUSTAIN_PEDAL) {
        onSustainChangeRef.current?.(data2 >= 64);
      }
    }

    input.onmidimessage = handleMessage;

    return () => {
      input.onmidimessage = null;
    };
  }, [selectedDeviceId]);

  return {
    devices,
    selectedDeviceId,
    selectDevice: setSelectedDeviceId,
  };
}
