// Minimum Vertex Cover
//
// Brute-force implementation suitable
// for small graphs.

function isVertexCover(
  vertices,
  edges,
  selected
) {

  const selectedSet =
    new Set(selected);

  return edges.every(
    ([u, v]) =>
      selectedSet.has(u) ||
      selectedSet.has(v)
  );
}


function countBits(value) {

  let count = 0;

  while (value) {

    value &=
      value - 1;

    count++;

  }

  return count;
}


function minimumVertexCover(
  vertices,
  edges
) {

  const n =
    vertices.length;

  let best = null;

  for (
    let mask = 0;
    mask < (1 << n);
    mask++
  ) {

    if (
      best &&
      countBits(mask) >=
        best.length
    ) {

      continue;

    }

    const selected = [];

    for (
      let i = 0;
      i < n;
      i++
    ) {

      if (
        mask &
        (1 << i)
      ) {

        selected.push(
          vertices[i]
        );

      }
    }

    if (
      isVertexCover(
        vertices,
        edges,
        selected
      )
    ) {

      best = selected;

    }
  }

  return best || [];
}


module.exports = {

  isVertexCover,

  minimumVertexCover

};