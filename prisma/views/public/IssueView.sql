SELECT
  i."Id",
  i.title,
  i.status,
  i."dateCompleted",
  i."createdAt",
  i."description",
  d."userName"
FROM
  (
    "Issue" i
    LEFT JOIN "Developers" d ON ((i."devId" = d."Id"))
  );