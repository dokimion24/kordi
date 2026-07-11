"use client";

interface MidiDeviceOption {
  id: string;
  name: string;
}

interface MidiStatusProps {
  midiName: string | undefined;
  fallback: string;
  devices?: MidiDeviceOption[];
  selectedDeviceId?: string | null;
  onSelectDevice?: (id: string) => void;
}

export function MidiStatus({
  midiName,
  fallback,
  devices,
  selectedDeviceId,
  onSelectDevice,
}: MidiStatusProps) {
  const showSelector =
    devices && devices.length > 1 && onSelectDevice !== undefined;

  return (
    <div className="mb-2 flex w-full max-w-4xl justify-end">
      {showSelector ? (
        <label className="flex items-center gap-1.5 rounded-full border border-black bg-black px-3 py-1 text-xs font-bold uppercase text-white">
          <span className="size-1.5 rounded-full bg-white" />
          <select
            value={selectedDeviceId ?? ""}
            onChange={(e) => onSelectDevice(e.target.value)}
            className="cursor-pointer appearance-none bg-black text-xs font-bold uppercase text-white outline-none"
            aria-label="MIDI device"
          >
            {devices.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
      ) : midiName ? (
        <span className="flex items-center gap-1.5 rounded-full border border-black bg-black px-3 py-1 text-xs font-bold uppercase text-white">
          <span className="size-1.5 rounded-full bg-white" />
          {midiName}
        </span>
      ) : (
        <span className="flex items-center gap-1.5 rounded-full border border-black bg-white px-3 py-1 text-xs font-bold uppercase text-black">
          <span className="size-1.5 rounded-full bg-black opacity-40" />
          {fallback}
        </span>
      )}
    </div>
  );
}
