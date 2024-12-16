/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lfjvjww6",
    "name": "kviz_kod",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 5,
      "max": 5,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uiygky2v",
    "name": "kartya_szin",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  // remove
  collection.schema.removeField("lfjvjww6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uiygky2v",
    "name": "kartya_szin",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
