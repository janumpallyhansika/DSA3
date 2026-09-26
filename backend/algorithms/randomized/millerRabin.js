// Miller-Rabin Primality Test

function modPow(
  base,
  exponent,
  modulus
) {

  let result = 1n;

  base %= modulus;

  while (
    exponent > 0n
  ) {

    if (
      exponent & 1n
    ) {

      result =
        (
          result *
          base
        ) % modulus;

    }

    base =
      (
        base *
        base
      ) % modulus;

    exponent >>= 1n;
  }

  return result;
}


function isPrime(n) {

  n = BigInt(n);

  if (n < 2n) {
    return false;
  }

  // Small prime checks
  const smallPrimes = [
    2n,
    3n,
    5n,
    7n,
    11n,
    13n,
    17n,
    19n,
    23n,
    29n,
    31n,
    37n
  ];

  for (
    const p of smallPrimes
  ) {

    if (n === p) {
      return true;
    }

    if (
      n % p === 0n
    ) {

      return false;

    }
  }

  // n - 1 = d * 2^s
  let d =
    n - 1n;

  let s = 0;

  while (
    (d & 1n) === 0n
  ) {

    d >>= 1n;

    s++;

  }

  // Deterministic bases for
  // 64-bit integers
  const bases = [
    2n,
    325n,
    9375n,
    28178n,
    450775n,
    9780504n,
    1795265022n
  ];

  for (
    let a of bases
  ) {

    if (
      a % n === 0n
    ) {

      continue;

    }

    let x =
      modPow(
        a % n,
        d,
        n
      );

    if (
      x === 1n ||
      x === n - 1n
    ) {

      continue;

    }

    let composite = true;

    for (
      let r = 1;
      r < s;
      r++
    ) {

      x =
        (
          x * x
        ) % n;

      if (
        x === n - 1n
      ) {

        composite = false;

        break;

      }
    }

    if (composite) {

      return false;

    }
  }

  return true;
}


module.exports = {
  isPrime
};