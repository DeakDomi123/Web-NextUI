/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zzwmy2yt7j2n00x",
    "created": "2024-12-01 20:31:02.672Z",
    "updated": "2024-12-01 20:31:02.672Z",
    "name": "verifiedQuizzes",
    "type": "base",
    "system": false,
    "schema": [
      {
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
  const collection = dao.findCollectionByNameOrId("zzwmy2yt7j2n00x");

  return dao.deleteCollection(collection);
})
