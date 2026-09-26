// Reservoir Sampling
//
// Selects k random items from a stream
// where the total stream size may be unknown.

function reservoirSample(
  items,
  k
) {

  if (
    k <= 0
  ) {

    return [];

  }

  if (
    k >= items.length
  ) {

    return [...items];

  }

  // Initial reservoir
  const reservoir =
    items.slice(0, k);

  // Process remaining items
  for (
    let i = k;
    i < items.length;
    i++
  ) {

    const randomIndex =
      Math.floor(
        Math.random() *
        (i + 1)
      );

    if (
      randomIndex < k
    ) {

      reservoir[
        randomIndex
      ] = items[i];

    }
  }

  return reservoir;
}


module.exports = {
  reservoirSample
};