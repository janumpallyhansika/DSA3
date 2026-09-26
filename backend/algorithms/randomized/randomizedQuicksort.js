// algorithms/randomized/randomizedQuicksort.js

/**
 * Randomized QuickSort
 *
 * Sorts an array using a randomly selected pivot.
 *
 * This implementation is suitable for:
 * - numbers
 * - strings
 * - any values that can be compared using <
 *
 * For PaperCheck, we mainly use it to sort
 * numerical similarity scores.
 */

function randomizedQuickSort(array) {
  // Create a copy so the original array is not modified
  const a = [...array];

  /**
   * Partition the array around a random pivot.
   */
  function partition(left, right) {
    // Select a random pivot index
    const pivotIndex =
      left +
      Math.floor(
        Math.random() *
          (right - left + 1)
      );

    // Move random pivot to the end
    [
      a[pivotIndex],
      a[right]
    ] = [
      a[right],
      a[pivotIndex]
    ];

    const pivot = a[right];

    let i = left;

    // Move values smaller than or equal to pivot
    // to the left side
    for (
      let j = left;
      j < right;
      j++
    ) {
      if (a[j] <= pivot) {
        [
          a[i],
          a[j]
        ] = [
          a[j],
          a[i]
        ];

        i++;
      }
    }

    // Put pivot in its correct position
    [
      a[i],
      a[right]
    ] = [
      a[right],
      a[i]
    ];

    return i;
  }

  /**
   * Recursive QuickSort
   */
  function quickSort(left, right) {
    // Base condition
    if (left >= right) {
      return;
    }

    // Partition using random pivot
    const pivot = partition(
      left,
      right
    );

    // Sort left part
    quickSort(
      left,
      pivot - 1
    );

    // Sort right part
    quickSort(
      pivot + 1,
      right
    );
  }

  // Start sorting
  if (a.length > 1) {
    quickSort(
      0,
      a.length - 1
    );
  }

  return a;
}


/**
 * Sort similarity values in descending order.
 *
 * Example:
 *
 * input:
 * [12.5, 78.4, 35.2, 91.3]
 *
 * output:
 * [91.3, 78.4, 35.2, 12.5]
 */
function randomizedQuickSortDescending(array) {
  const sorted =
    randomizedQuickSort(array);

  return sorted.reverse();
}


/**
 * Sort similarity values in ascending order.
 *
 * Example:
 *
 * input:
 * [12.5, 78.4, 35.2, 91.3]
 *
 * output:
 * [12.5, 35.2, 78.4, 91.3]
 */
function randomizedQuickSortAscending(array) {
  return randomizedQuickSort(array);
}


module.exports = {
  randomizedQuickSort,
  randomizedQuickSortDescending,
  randomizedQuickSortAscending
};