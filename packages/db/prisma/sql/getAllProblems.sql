SELECT
  p.id,
  p.name,
  p.difficulty,
  COALESCE(bm.bookmark_count, 0)::int AS totalBookmarks,
  COALESCE(s.solved_count, 0)::int AS totalUsersSolved,
  EXISTS (
    SELECT 1
    FROM submission s2
    WHERE s2.problem_id = p.id AND s2.user_id = $1::uuid AND s2.status = 'Accepted'
  ) AS hasSolved,
  ARRAY_AGG(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL) AS topics,
  ARRAY_AGG(DISTINCT l.name) FILTER (WHERE l.name IS NOT NULL) AS lists
FROM
  problem p
LEFT JOIN (
  SELECT
    problem_id,
    COUNT(*)::int AS bookmark_count
  FROM
    bookmark
  GROUP BY
    problem_id
) bm ON p.id = bm.problem_id
LEFT JOIN (
  SELECT
    problem_id,
    COUNT(DISTINCT user_id)::int AS solved_count
  FROM
    submission
  WHERE
    status = 'Accepted'
  GROUP BY
    problem_id
) s ON p.id = s.problem_id
LEFT JOIN topic_problem tp ON p.id = tp.problem_id
LEFT JOIN topic t ON tp.topic_id = t.id
LEFT JOIN list_problem lp ON p.id = lp.problem_id
LEFT JOIN list l ON lp.list_id = l.id
GROUP BY
  p.id, p.name, p.difficulty, bm.bookmark_count, s.solved_count
ORDER BY
  p.rank ASC;
