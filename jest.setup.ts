import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as typeof global.TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}
const originalError = console.error;

console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Could not parse CSS stylesheet')
  ) {
    // Ignore the specific JSDOM CSS parsing error
    return;
  }

  originalError(...args);
};
