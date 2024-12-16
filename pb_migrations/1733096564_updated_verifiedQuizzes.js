/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzwmy2yt7j2n00x")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_7Q2PRR3` ON `verifiedQuizzes` (`quiz_id`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzwmy2yt7j2n00x")

  collection.indexes = []

  return dao.saveCollection(collection)
})
