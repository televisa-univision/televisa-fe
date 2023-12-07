import path from 'path';
import dotenv from 'dotenv';
import { format } from "util";

// Setup test/dev environments variables
const env = dotenv.config({ path: path.resolve(process.cwd(), '.env.example') });

if (env.error) {
  throw env.error;
}

// To make .env more relevant in test
// over CI variable environments
process.env = {
  ...process.env,
  ...env.parsed,
};

if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

  window.scrollTo = jest.fn();
}

// To prevent unhandled unit test fails and props warnings
const error = global.console.error;
global.console.error = function(...args) {
  error(...args);
  throw(format(...args));
};
