/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzwmy2yt7j2n00x")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i6cnzxj3",
    "name": "quiz_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tih8umt18l5l6ou",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzwmy2yt7j2n00x")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i6cnzxj3",
    "name": "quiz_id",
    "type": "relation",
    "required": true,
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
