type Updater<T> = (state: T) => T;
type Update<T> = Updater<T> | T;

export type Store<T> = {
  get: () => T;
  set: (update: Update<T>) => void;
  sub: (callback: VoidFunction) => VoidFunction;
};

function isUpdater<T>(value: Update<T>): value is Updater<T> {
  return typeof value === "function";
}

export function createExternalStore<T>(init: T): Store<T> {
  let state = init;
  const listeners = new Set<VoidFunction>();

  const get = () => state;

  function set(update: Updater<T> | T) {
    state = isUpdater<T>(update) ? update(state) : update;
    listeners.forEach((l) => l());
  }

  const sub = (listener: VoidFunction) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { get, set, sub } as const;
}

export function createStore<T>(init: T) {
  const store = createExternalStore(init);
  return [store, store.set] as const;
}
