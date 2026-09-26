// Subset Sum Problem

function subsetSum(
  numbers,
  target
) {

  const possible =
    Array(target + 1)
      .fill(false);

  possible[0] = true;

  for (
    const number of numbers
  ) {

    for (
      let sum = target;
      sum >= number;
      sum--
    ) {

      possible[sum] =
        possible[sum] ||
        possible[
          sum - number
        ];

    }
  }

  return possible[target];
}


module.exports = {
  subsetSum
};