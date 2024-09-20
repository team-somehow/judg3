import random
import numpy as np

EPSILON = 0.2  

def calculate_information_gain(i, j, scores):
    project1_wins = scores[i][j]
    project2_wins = scores[j][i]

    p1 = project1_wins / (project1_wins + project2_wins) if (project1_wins + project2_wins) > 0 else 0.5
    p2 = project2_wins / (project1_wins + project2_wins) if (project1_wins + project2_wins) > 0 else 0.5

    if p1 == 0 or p2 == 0: return 0

    entropy_before = -(p1 * np.log2(p1) + p2 * np.log2(p2))
    entropy_after = -(p1 * np.log2(p1) + (1 - p1) * np.log2(1 - p1))

    return entropy_before - entropy_after

def suggest(user_id, base_project, scores, existingComparisions):
    suggested_projects = []
    
    for i in range(len(scores)):
        if(i == base_project): continue

        project1_id = min(base_project, i)
        project2_id = max(base_project, i)

        existing_pairing = (user_id, project1_id, project2_id) in existingComparisions

        if not existing_pairing:
            suggested_projects.append(i)

    if not suggested_projects:
        return -1

    probability = random.random()

    if probability < EPSILON:
        best_project = random.choice(suggested_projects)
    else:
        best_project = max(
            suggested_projects,
            key=lambda p: calculate_information_gain(base_project, p, scores)
        )

    project1_id = min(base_project, best_project)
    project2_id = max(base_project, best_project)

    return (project1_id, project2_id)

print(suggest(1, 0, [[0,2,0,1],[3,0,5,0],[0,3,0,1],[4,0,3,0]], []))