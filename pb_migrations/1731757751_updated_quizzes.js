/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  // remove
  collection.schema.removeField("jsmed2go")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x5nuhumx",
    "name": "nehezseg",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jsmed2go",
    "name": "nehezseg",
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

  // remove
  collection.schema.removeField("x5nuhumx")

  return dao.saveCollection(collection)
})
