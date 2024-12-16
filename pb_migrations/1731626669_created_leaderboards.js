/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "efvzb60ragrr79x",
    "created": "2024-11-14 23:24:29.891Z",
    "updated": "2024-11-14 23:24:29.891Z",
    "name": "leaderboards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bkhxpcmd",
        "name": "jatekos",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "9jjyqsrz",
        "name": "pontszam",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("efvzb60ragrr79x");

  return dao.deleteCollection(collection);
})
