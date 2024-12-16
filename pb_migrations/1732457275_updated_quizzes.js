/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  // remove
  collection.schema.removeField("x5nuhumx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dp5jqgbv",
    "name": "difficulty",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x5nuhumx",
    "name": "difficulty",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 3,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("dp5jqgbv")

  return dao.saveCollection(collection)
})
