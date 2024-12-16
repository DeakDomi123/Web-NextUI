/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efvzb60ragrr79x")

  // remove
  collection.schema.removeField("9jjyqsrz")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efvzb60ragrr79x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9jjyqsrz",
    "name": "pontszam",
    "type": "bool",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
