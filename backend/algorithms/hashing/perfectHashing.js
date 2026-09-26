/**
 * Static Perfect Hashing
 *
 * Searches for a seed that produces
 * a collision-free mapping.
 */

// --------------------------------------------------
// String hash
// --------------------------------------------------

function stringHash(
  key,
  seed,
  size
) {

  let hash =
    seed >>> 0;

  for (
    const ch of String(key)
  ) {

    hash =
      Math.imul(
        hash ^
        ch.charCodeAt(0),
        16777619
      ) >>> 0;

  }

  return hash % size;

}

// --------------------------------------------------
// Build perfect hash table
// --------------------------------------------------

function buildPerfectHash(
  keys
) {

  const uniqueKeys =
    [
      ...new Set(
        keys.map(String)
      )
    ];

  if (
    uniqueKeys.length === 0
  ) {

    return {

      size: 0,

      seed: 0,

      slots: []

    };

  }

  const size =
    uniqueKeys.length;

  for (
    let seed = 1;
    seed < 100000;
    seed++
  ) {

    const slots =
      Array(size).fill(null);

    let success = true;

    for (
      const key of uniqueKeys
    ) {

      const index =
        stringHash(
          key,
          seed,
          size
        );

      if (
        slots[index] !== null
      ) {

        success = false;

        break;

      }

      slots[index] = key;

    }

    if (success) {

      return {

        size,

        seed,

        slots

      };

    }

  }

  throw new Error(
    "Could not construct a collision-free static table."
  );

}

module.exports = {

  stringHash,

  buildPerfectHash

};