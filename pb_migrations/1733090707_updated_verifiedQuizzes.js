/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzwmy2yt7j2n00x")

  collection.updateRule = "@request.auth.role = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzwmy2yt7j2n00x")

  collection.updateRule = "@request.auth.role = true && @request.data.quiz_id = quiz_id"

  return dao.saveCollection(collection)
})
