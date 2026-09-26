// Dinic's Maximum Flow Algorithm

function buildLevelGraph(
  graph,
  source
) {

  const level =
    Array(graph.length).fill(-1);

  const queue = [source];

  level[source] = 0;

  while (queue.length > 0) {

    const u =
      queue.shift();

    for (
      let v = 0;
      v < graph.length;
      v++
    ) {

      if (
        level[v] < 0 &&
        graph[u][v] > 0
      ) {

        level[v] =
          level[u] + 1;

        queue.push(v);

      }
    }
  }

  return level;
}


function sendFlow(
  graph,
  level,
  pointer,
  u,
  sink,
  flow
) {

  if (u === sink) {
    return flow;
  }

  for (
    ;
    pointer[u] < graph.length;
    pointer[u]++
  ) {

    const v =
      pointer[u];

    if (
      level[v] !==
        level[u] + 1 ||
      graph[u][v] <= 0
    ) {

      continue;

    }

    const pushed =
      sendFlow(
        graph,
        level,
        pointer,
        v,
        sink,
        Math.min(
          flow,
          graph[u][v]
        )
      );

    if (pushed > 0) {

      graph[u][v] -=
        pushed;

      graph[v][u] +=
        pushed;

      return pushed;
    }
  }

  return 0;
}


function dinic(
  capacity,
  source,
  sink
) {

  const graph =
    capacity.map(
      row => [...row]
    );

  let maxFlow = 0;

  while (true) {

    const level =
      buildLevelGraph(
        graph,
        source
      );

    if (
      level[sink] < 0
    ) {

      break;

    }

    const pointer =
      Array(graph.length)
        .fill(0);

    while (true) {

      const pushed =
        sendFlow(
          graph,
          level,
          pointer,
          source,
          sink,
          Infinity
        );

      if (pushed === 0) {
        break;
      }

      maxFlow +=
        pushed;
    }
  }

  return {
    maxFlow,
    residualGraph: graph
  };
}


module.exports = {
  dinic
};