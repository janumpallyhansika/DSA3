// 0/1 Knapsack Problem

function knapsack(
  items,
  capacity
) {

  const dp =
    Array(capacity + 1)
      .fill(0);

  for (
    const item of items
  ) {

    for (
      let weight = capacity;
      weight >= item.weight;
      weight--
    ) {

      dp[weight] =
        Math.max(

          dp[weight],

          dp[
            weight -
            item.weight
          ] +
          item.value

        );

    }
  }

  return dp[capacity];
}


module.exports = {
  knapsack
};