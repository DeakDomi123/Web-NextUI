/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efvzb60ragrr79x")

  collection.deleteRule = "@request.auth.id = quiz_id.creator.id || @request.auth.role = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efvzb60ragrr79x")

  collection.deleteRule = "@request.auth.id = quiz_id.creator.id || @request.auth.id = \"4ez2fnfnyo0aukn\""

  return dao.saveCollection(collection)
})
