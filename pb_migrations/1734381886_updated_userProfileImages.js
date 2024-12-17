/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9l4ffnz8oouuxb7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dayvsjec",
    "name": "user_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9l4ffnz8oouuxb7")

  // remove
  collection.schema.removeField("dayvsjec")

  return dao.saveCollection(collection)
})
