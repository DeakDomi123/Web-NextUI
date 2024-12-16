/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzwmy2yt7j2n00x")

  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzwmy2yt7j2n00x")

  collection.updateRule = "@request.auth.role = true"
  collection.deleteRule = "@request.auth.role = true"

  return dao.saveCollection(collection)
})
