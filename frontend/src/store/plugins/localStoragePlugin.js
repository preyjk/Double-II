import { watch } from "vue";

export function localStoragePlugin(store) {
  Object.keys(store.state.localStorage).forEach((key) => {
    console.debug(`initializing ${key}`);
    
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      store.state.localStorage[key] = JSON.parse(storedValue);
    }    
    
    console.debug(`storedValue of ${key}: ${storedValue}`);

    watch(() => store.state.localStorage[key], (newValue) => {
      if (newValue === null || newValue === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  });
}