import { useSyncExternalStore } from "react";

import { Store } from "./create";

/**
 * Creates a store and returns a hook to access it.
 * @param init The initial value of the store.
 * @returns A tuple containing the store and a setter for the store.
 * @example
 * const [store, set] = createStore(0);
 *
 * const Comp = () => {
 *  const [state, setState] = useExternalStore(store);
 * return <button onClick={() => setState(state + 1)}>{state}</button>;
 * };
 */
export function useExternalStore<T>({ get, set, sub }: Store<T>) {
  return [useSyncExternalStore(sub, get), set] as const;
}
