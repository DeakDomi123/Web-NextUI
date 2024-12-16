/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zti83jff1fohubr",
    "created": "2024-12-01 19:12:18.652Z",
    "updated": "2024-12-01 19:12:18.652Z",
    "name": "verifieds",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0xoenew5",
        "name": "field",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "tih8umt18l5l6ou",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zti83jff1fohubr");

  return dao.deleteCollection(collection);
})
