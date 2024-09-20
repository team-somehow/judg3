function rankList(matrix: number[][]): number[] {
    let scores: number[] = Array(matrix.length).fill(1.0);

    for (let iter = 0; iter < 100; iter++) {
        for (let i = 0; i < matrix.length; i++) {
            let sum_num = 0;
            let sum_den = 0;
            for (let j = 0; j < matrix.length; j++) {
                if (i !== j) {
                    sum_num += matrix[i][j] * (scores[j] / (scores[i] + scores[j]));
                    sum_den += matrix[j][i] / (scores[i] + scores[j]);
                }
            }
            if (sum_den > 0) {
                scores[i] = sum_num / sum_den;
            }
        }
    }

    // Calculate geometric mean
    const geometricMean = Math.pow(scores.reduce((acc, val) => acc * val, 1), 1 / scores.length);

    // Normalize the scores
    scores = scores.map(score => score / geometricMean);

    // Create an array of indices and their corresponding scores
    let indexedScores: [number, number][] = scores.map((score, index) => [index, score]);

    // Sort the indexed scores based on the score in descending order
    indexedScores.sort((a, b) => b[1] - a[1]);

    // Return the sorted indices, incremented by 1
    const sortedIndices: number[] = indexedScores.map(([index]) => index);

    return sortedIndices;
}

// Example usage
console.log(rankList([[0, 2, 0, 1], [3, 0, 5, 0], [0, 3, 0, 1], [4, 0, 3, 0]]));