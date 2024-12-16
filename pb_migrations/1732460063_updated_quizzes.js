/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  collection.updateRule = "@request.auth.id = creator.id || @request.auth.role = true"
  collection.deleteRule = "@request.auth.id = creator.id || @request.auth.role = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  collection.updateRule = "@request.auth.id = creator.id || @request.auth.id = \"4ez2fnfnyo0aukn\""
  collection.deleteRule = "@request.auth.id = creator.id || @request.auth.id = \"4ez2fnfnyo0aukn\""

  return dao.saveCollection(collection)
})
