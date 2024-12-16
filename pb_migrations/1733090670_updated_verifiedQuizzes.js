/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzwmy2yt7j2n00x")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "@request.auth.role = true"
  collection.updateRule = "@request.auth.role = true && @request.data.quiz_id = quiz_id"
  collection.deleteRule = "@request.auth.role = true"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i6cnzxj3",
    "name": "quiz_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tih8umt18l5l6ou",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzwmy2yt7j2n00x")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i6cnzxj3",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tih8umt18l5l6ou",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
