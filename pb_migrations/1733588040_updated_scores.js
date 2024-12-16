/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efvzb60ragrr79x")

  collection.createRule = "@request.auth.id = @request.data.user_id"
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efvzb60ragrr79x")

  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = "@request.auth.id = quiz_id.creator.id || @request.auth.role = true"

  return dao.saveCollection(collection)
})
