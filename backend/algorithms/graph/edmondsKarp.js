// Edmonds-Karp Algorithm
//
// Ford-Fulkerson using BFS
// to find augmenting paths.

function bfs(
  graph,
  source,
  sink,
  parent
) {

  parent.fill(-1);

  const queue = [source];

  parent[source] = source;

  while (queue.length > 0) {

    const u =
      queue.shift();

    for (
      let v = 0;
      v < graph.length;
      v++
    ) {

      if (
        parent[v] === -1 &&
        graph[u][v] > 0
      ) {

        parent[v] = u;

        if (v === sink) {
          return true;
        }

        queue.push(v);
      }
    }
  }

  return false;
}


function edmondsKarp(
  capacity,
  source,
  sink
) {

  const graph =
    capacity.map(
      row => [...row]
    );

  const parent =
    Array(graph.length).fill(-1);

  let maxFlow = 0;

  while (
    bfs(
      graph,
      source,
      sink,
      parent
    )
  ) {

    let pathFlow =
      Infinity;

    for (
      let v = sink;
      v !== source;
      v = parent[v]
    ) {

      pathFlow =
        Math.min(
          pathFlow,
          graph[parent[v]][v]
        );

    }

    for (
      let v = sink;
      v !== source;
      v = parent[v]
    ) {

      const u =
        parent[v];

      graph[u][v] -=
        pathFlow;

      graph[v][u] +=
        pathFlow;

    }

    maxFlow +=
      pathFlow;
  }

  return {
    maxFlow,
    residualGraph: graph
  };
}


module.exports = {
  edmondsKarp
};