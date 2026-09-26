// Minimum Cut Algorithm

function reachableVertices(
  residualGraph,
  source
) {

  const visited =
    Array(
      residualGraph.length
    ).fill(false);

  const queue = [source];

  visited[source] = true;

  while (queue.length > 0) {

    const u =
      queue.shift();

    for (
      let v = 0;
      v < residualGraph.length;
      v++
    ) {

      if (
        !visited[v] &&
        residualGraph[u][v] > 0
      ) {

        visited[v] = true;

        queue.push(v);

      }
    }
  }

  return visited;
}


function minimumCut(
  capacity,
  source,
  sink
) {

  const {
    edmondsKarp
  } = require(
    "./edmondsKarp"
  );

  const result =
    edmondsKarp(
      capacity,
      source,
      sink
    );

  const reachable =
    reachableVertices(
      result.residualGraph,
      source
    );

  const cutEdges = [];

  for (
    let u = 0;
    u < capacity.length;
    u++
  ) {

    for (
      let v = 0;
      v < capacity.length;
      v++
    ) {

      if (
        reachable[u] &&
        !reachable[v] &&
        capacity[u][v] > 0
      ) {

        cutEdges.push({

          from: u,

          to: v,

          capacity:
            capacity[u][v]

        });

      }
    }
  }

  return {

    maxFlow:
      result.maxFlow,

    cutEdges,

    reachable

  };
}


module.exports = {
  minimumCut
};