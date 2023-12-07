import { format } from "util";

// To prevent unhandled unit test fails and props warnings
const error = global.console.error;
global.console.error = function(...args) {
  error(...args);
  throw(format(...args));
};
