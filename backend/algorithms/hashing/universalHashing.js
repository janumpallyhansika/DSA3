/**
 * Universal Hashing
 *
 * h(x) = ((a*x + b) mod p) mod m
 */

// --------------------------------------------------
// Universal Hash
// --------------------------------------------------

function universalHash(
  key,
  a = 31,
  b = 17,
  p = 1000000007,
  m = 100003
) {

  let x = 0;

  const text =
    String(key);

  for (
    const ch of text
  ) {

    x =
      (
        x * 257 +
        ch.charCodeAt(0)
      ) % p;

  }

  return (
    (a * x + b) % p
  ) % m;

}

// --------------------------------------------------
// Create hash table
// --------------------------------------------------

function createUniversalHashTable(
  values,
  size = 101
) {

  const table =
    Array.from(
      { length: size },
      () => []
    );

  for (
    const value of values
  ) {

    const index =
      universalHash(
        value,
        31,
        17,
        1000000007,
        size
      );

    table[index].push(
      value
    );

  }

  return table;

}

module.exports = {

  universalHash,

  createUniversalHashTable

};