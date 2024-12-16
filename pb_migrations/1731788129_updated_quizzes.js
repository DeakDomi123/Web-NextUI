/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_VDQgaAS` ON `quizzes` (`quiz_code`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  collection.indexes = []

  return dao.saveCollection(collection)
})
