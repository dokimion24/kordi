import { useRef } from "react";

/**
 * Keeps a ref always in sync with the latest callback.
 * Eliminates the manual `ref.current = callback` pattern.
 */
export function useCallbackRef<T>(callback: T): React.RefObject<T> {
  const ref = useRef(callback);
  ref.current = callback;
  return ref;
}
