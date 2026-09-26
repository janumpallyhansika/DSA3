// Maximum Clique Problem

function maximumClique(
  vertices,
  edges
) {

  const n =
    vertices.length;

  const adjacency =
    new Set();

  for (
    const [u, v] of edges
  ) {

    adjacency.add(
      `${u}|${v}`
    );

    adjacency.add(
      `${v}|${u}`
    );

  }

  let best = [];

  for (
    let mask = 0;
    mask < (1 << n);
    mask++
  ) {

    const group = [];

    for (
      let i = 0;
      i < n;
      i++
    ) {

      if (
        mask &
        (1 << i)
      ) {

        group.push(
          vertices[i]
        );

      }
    }

    if (
      group.length <=
      best.length
    ) {

      continue;

    }

    let isClique = true;

    for (
      let i = 0;
      i < group.length &&
      isClique;
      i++
    ) {

      for (
        let j = i + 1;
        j < group.length;
        j++
      ) {

        if (
          !adjacency.has(
            `${group[i]}|${group[j]}`
          )
        ) {

          isClique = false;

          break;

        }
      }
    }

    if (isClique) {

      best = group;

    }
  }

  return best;
}


module.exports = {
  maximumClique
};