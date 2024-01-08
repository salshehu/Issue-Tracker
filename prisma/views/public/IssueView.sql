SELECT
  i."Id",
  i.title,
  i.status,
  i.description,
  i."dateCompleted",
  i."createdAt",
  d."userName"
FROM
  (
    "Issue" i
    LEFT JOIN "Developers" d ON ((i."devId" = d."Id"))
  );