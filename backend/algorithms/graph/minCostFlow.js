// Minimum Cost Maximum Flow

function minCostMaxFlow(
  capacity,
  cost,
  source,
  sink,
  maxRequestedFlow = Infinity
) {

  const n =
    capacity.length;

  const residual =
    capacity.map(
      row => [...row]
    );

  const totalCost =
    cost.map(
      row => [...row]
    );

  let flow = 0;

  let expense = 0;

  while (
    flow < maxRequestedFlow
  ) {

    const distance =
      Array(n).fill(Infinity);

    const parent =
      Array(n).fill(-1);

    const used =
      Array(n).fill(false);

    distance[source] = 0;

    // Shortest path
    for (
      let iteration = 0;
      iteration < n;
      iteration++
    ) {

      let u = -1;

      for (
        let i = 0;
        i < n;
        i++
      ) {

        if (
          !used[i] &&
          distance[i] < Infinity &&
          (
            u === -1 ||
            distance[i] <
              distance[u]
          )
        ) {

          u = i;

        }
      }

      if (u === -1) {
        break;
      }

      used[u] = true;

      for (
        let v = 0;
        v < n;
        v++
      ) {

        if (
          residual[u][v] <= 0
        ) {

          continue;

        }

        const newDistance =
          distance[u] +
          totalCost[u][v];

        if (
          newDistance <
          distance[v]
        ) {

          distance[v] =
            newDistance;

          parent[v] =
            u;

        }
      }
    }

    // No path
    if (
      parent[sink] === -1
    ) {

      break;

    }

    let pushed =
      maxRequestedFlow -
      flow;

    // Find bottleneck
    for (
      let v = sink;
      v !== source;
      v = parent[v]
    ) {

      pushed =
        Math.min(
          pushed,
          residual[parent[v]][v]
        );

    }

    // Update flow
    for (
      let v = sink;
      v !== source;
      v = parent[v]
    ) {

      const u =
        parent[v];

      residual[u][v] -=
        pushed;

      residual[v][u] +=
        pushed;

      expense +=
        pushed *
        totalCost[u][v];

    }

    flow +=
      pushed;
  }

  return {

    flow,

    cost: expense,

    residualGraph:
      residual

  };
}


module.exports = {
  minCostMaxFlow
};