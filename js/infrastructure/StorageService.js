class StorageService {
  get(key) {
    /* read from localStorage, JSON.parse it, return null if nothing's there */
    return JSON.parse(localStorage.getItem(key));
  }

  set(key, value) {
    /* JSON.stringify the value, save it to localStorage under that key */
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    /* localStorage.removeItem(key) */
    localStorage.removeItem(key);
  }
}