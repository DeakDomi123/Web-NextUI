/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "tih8umt18l5l6ou",
    "created": "2024-11-14 23:21:39.391Z",
    "updated": "2024-11-14 23:21:39.391Z",
    "name": "quizzes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "q9xricmw",
        "name": "kviz_leiras",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 10,
          "max": 200,
          "pattern": ""
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "uqsajssd",
        "name": "kerdesek_szama",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "g9rzmsvl",
        "name": "kategoria",
        "type": "text",
        "required": true,
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
      },
      {
        "system": false,
        "id": "gz2fbtal",
        "name": "kerdesek",
        "type": "text",
        "required": true,
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
        "id": "u8bqz4jp",
        "name": "valaszok",
        "type": "text",
        "required": true,
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
        "id": "3gg8xqds",
        "name": "helyes_valasz",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("tih8umt18l5l6ou");

  return dao.deleteCollection(collection);
})
