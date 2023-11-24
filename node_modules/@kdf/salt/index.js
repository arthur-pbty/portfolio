'use strict';

const crypto = require('crypto');

const MAX_UINT31 = 2147483647; // 2**31 - 1

/**
 * Generates a cryptographically secure random string to be used as a password
 * salt, using Node's built-in crypto.randomBytes() function.
 * @public
 * @param  {number} length The length of the salt to be generated.
 * Must be an integer within the range (`0` <= `length` <= `2^31-1`).
 * @return {Promise.<Buffer>} The salt as a Buffer.
 */
function gensalt(length) {
  // Salt length Validation
  if (typeof length !== 'number' || !Number.isInteger(length)) {
    return Promise.reject(
      new TypeError("The 'length' parameter must be an integer")
    );
  }

  if (length < 0 || length > MAX_UINT31) {
    return Promise.reject(
      new TypeError(
        `The 'length' parameter must be in the range (0 <= length <= ${MAX_UINT31})`
      )
    );
  }

  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, salt) => {
      /* istanbul ignore next */
      if (err) reject(err);
      else resolve(salt);
    });
  });
}

module.exports = gensalt;
