## Követelménylista


| Modul | ID | Név | v. | Kifejtés |
| -------- | ------- | -------- | ------- | -------- |
| Jogosultság | K1 | Bejelentkezési felület | 1.0 | A felhasználó az email címe és a jelszava segítségével bejelentkezhet. Ha a megadott email cím vagy jelszó nem megfelelő, akkor a felhasználó hibaüzenetet kap. |
| Jogosultság | K2 | Regisztrációs felület | 1.0 | A felhasználó az email címének és jelszavának megadásával tud regisztrálni. A jelszó tárolása kódolva történik az adatbázisban, ha valamelyik adat ezek közül hiányzik vagy nem felel meg a követelményeknek, akkor a rendszer értesíti a felhasználót. |
| Jogosultság | K3 | Jogosultsági szintek | 1.0 | - Admin: a kvízek módosítása, törlése, új kvíz feltöltése, kvíz kitöltése, keresés<br/>- Felhasználó: új kvíz feltöltése, kvíz kitöltése, keresés| -Felhasználó: kvíz feltöltése, saját kvíz törlése, kvíz kitöltése, toplista megtekintése, keresés |
| Készítő | K4 | Kvíz készítő | 1.0 | Kvíz létrehozására szolgáló felület. Egy kvíz több kérdésből állhat, amelyekhez meg lehet adni magát a kérdést, a válaszlehetőségeket, illetve a helyes választ. Ezen túl minden kvízhez tartozik egy leírás és kategória is. |
| Modifikáció | K5 | Kvíz szerkesztő | 1.0 | Felhasználói módban a saját kvízt lehet szerkeszteni, a kérdéseket módosítani. Adminisztrátori fiókkal pedig az összes kvízet lehet. |
| Felület | K6 | Kvíz kitöltő oldal  | 1.0 | Több kérdésből áll, itt választja ki a felhasználó a válaszok közül az általa helyesnek gondolt megoldást, egy kérdésre maximum |
| Statisztika | K7 | Toplista | 1.0 | Egy lista, az adott kvíz esetén elért legtöbb pontot elért felhasználókról. |
| Felület | K8 | Főoldal felülete | 1.0 | Tartalmazza az első n lekért kvíz kérdéssort az adatbázisból, amit ki lehet tölteni. Tartalmaz egy keresősávot, amiben kvíz kódja vagy kategóriája alapján lehet keresni. |
| Felület | K9 | Kvíz kereső | 1.0 | Az elérhető kvízek között kategóra vagy kód alapján lehet keresni a főoldalról elérhető menüpontban. | 
| Felület | K10 | Saját kvízek | 1.0 | A felhasználó által készített kvízek listája. Lehetőség szerkesztésre és törlésre is. | 
| Jogosultság | K11 | Admin kvíz ellenőrző felület | 1.0 | Csak Admin jogosultsággal elérhető. Lista az összes kvízzel. Itt kell jóváhagyni a kvízeket. Lehetőség szerkesztésre és törlésre is. | 
| Modifikáció | K12 | Felhasználó módosítása | 1.0 | Felhasználónak lehetősége van a felhasználói nevének, illetve profilképének módosítására. |

### [Back to README](/README.md)
