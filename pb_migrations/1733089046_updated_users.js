/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.createRule = "@request.data.role = null || @request.data.role = false"
  collection.updateRule = "id = @request.auth.id && (@request.data.role = null || @request.data.role = false)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.createRule = ""
  collection.updateRule = "id = @request.auth.id"

  return dao.saveCollection(collection)
})
