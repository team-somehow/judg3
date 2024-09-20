import numpy as np

def rankList(matrix):
    scores = [1.0] * len(matrix)

    for _ in range(100):
        for i in range(len(matrix)):
            sum_num = 0
            sum_den = 0
            for j in range(len(matrix)):
                if i != j:
                    sum_num += matrix[i][j] * (scores[j] / (scores[i] + scores[j]))
                    sum_den += matrix[j][i] / (scores[i] + scores[j])
            if sum_den > 0:
                scores[i] = sum_num / sum_den

    geometric_mean = np.prod(scores) ** (1 / len(scores))
    scores = [score / geometric_mean for score in scores]

    indexed_scores = [(i, scores[i]) for i in range(len(scores))]
    indexed_scores.sort(key=lambda x: x[1], reverse=True)
    sorted_indices = [index + 1 for index, score in indexed_scores]

    return sorted_indices

print(rankList([[0,2,0,1],[3,0,5,0],[0,3,0,1],[4,0,3,0]]))