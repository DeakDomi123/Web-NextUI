/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q9xricmw",
    "name": "quiz_description",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 10,
      "max": 400,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q9xricmw",
    "name": "quiz_description",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 10,
      "max": 200,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
