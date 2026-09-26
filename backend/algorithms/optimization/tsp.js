// Travelling Salesperson Problem
//
// Dynamic Programming / Bitmask approach.

function travelingSalesperson(
  distance
) {

  const n =
    distance.length;

  if (n === 0) {

    return {
      cost: 0,
      path: []
    };

  }

  const size =
    1 << n;

  const dp =
    Array.from(
      { length: size },
      () =>
        Array(n).fill(Infinity)
    );

  const parent =
    Array.from(
      { length: size },
      () =>
        Array(n).fill(-1)
    );

  // Start at vertex 0
  dp[1][0] = 0;

  for (
    let mask = 1;
    mask < size;
    mask++
  ) {

    for (
      let u = 0;
      u < n;
      u++
    ) {

      if (
        !(mask & (1 << u)) ||
        dp[mask][u] === Infinity
      ) {

        continue;

      }

      for (
        let v = 0;
        v < n;
        v++
      ) {

        if (
          mask &
          (1 << v)
        ) {

          continue;

        }

        const nextMask =
          mask |
          (1 << v);

        const newCost =
          dp[mask][u] +
          distance[u][v];

        if (
          newCost <
          dp[nextMask][v]
        ) {

          dp[nextMask][v] =
            newCost;

          parent[nextMask][v] =
            u;

        }
      }
    }
  }

  const fullMask =
    size - 1;

  let bestCost =
    Infinity;

  let last = -1;

  // Return to starting vertex
  for (
    let u = 1;
    u < n;
    u++
  ) {

    const totalCost =
      dp[fullMask][u] +
      distance[u][0];

    if (
      totalCost <
      bestCost
    ) {

      bestCost =
        totalCost;

      last = u;

    }
  }

  const reversed = [];

  let mask =
    fullMask;

  while (
    last !== -1
  ) {

    reversed.push(last);

    const previous =
      parent[mask][last];

    mask ^=
      1 << last;

    last = previous;
  }

  reversed.reverse();

  return {

    cost: bestCost,

    path: [
      0,
      ...reversed,
      0
    ]

  };
}


module.exports = {
  travelingSalesperson
};