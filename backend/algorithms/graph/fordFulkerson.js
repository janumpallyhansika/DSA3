// Ford-Fulkerson Maximum Flow Algorithm

function bfsResidual(
  graph,
  source,
  sink,
  parent
) {

  const visited =
    Array(graph.length).fill(false);

  const queue = [source];

  visited[source] = true;

  parent.fill(-1);

  while (queue.length > 0) {

    const u =
      queue.shift();

    for (
      let v = 0;
      v < graph.length;
      v++
    ) {

      if (
        !visited[v] &&
        graph[u][v] > 0
      ) {

        parent[v] = u;

        visited[v] = true;

        queue.push(v);

        if (v === sink) {
          return true;
        }
      }
    }
  }

  return visited[sink];
}


function fordFulkerson(
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
    bfsResidual(
      graph,
      source,
      sink,
      parent
    )
  ) {

    let pathFlow =
      Infinity;

    // Find bottleneck
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

    // Update residual graph
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
  fordFulkerson
};