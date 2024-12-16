/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efvzb60ragrr79x")

  // remove
  collection.schema.removeField("bkhxpcmd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "02ns1hux",
    "name": "jatekos",
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
  const collection = dao.findCollectionByNameOrId("efvzb60ragrr79x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkhxpcmd",
    "name": "jatekos",
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
  collection.schema.removeField("02ns1hux")

  return dao.saveCollection(collection)
})
