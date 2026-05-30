import "@testing-library/jest-dom";

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
    clear: () => null,
  },

  writable: true,
});