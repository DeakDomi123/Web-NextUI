/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  // remove
  collection.schema.removeField("3vleqrnq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gqlkmhhl",
    "name": "keszito",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3vleqrnq",
    "name": "kviz_keszitoje",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 5,
      "max": 40,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("gqlkmhhl")

  return dao.saveCollection(collection)
})
