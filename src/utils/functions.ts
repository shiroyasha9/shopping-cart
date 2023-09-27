import EventEmitter from "../components/EventEmitter";

export const showToast = (message: string, duration = 3000) => {
  EventEmitter.emit("showToast", message, duration);
};
