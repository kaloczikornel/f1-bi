# F1 elemző program - Üzleti intelligencia tárgy házi feladat

## Leírás
A program egy F1-es adatbázisból kinyeri a versenyzők és a csapatok adatait, majd ezeket egy Elasticsearch adatbázisba
menti. A program a versenyzők és a csapatok adatait Kibanában lehet megtekinteni. A program Node.js-ben íródott valamint
dockert használ az Elasticsearch valamint a Kibana futtatásához, így a docker deamon valamint a Node.js előkövetelménye 
a futtatásnak. 

## Installálás
```bash
npm install
```

## Futtatás
```bash
./startes.sh
./startkibana.sh
```

A futtatás Mac-en lett tesztelve, Linux-on is működnie kellene. A programokat a `localhost:9200` és a `localhost:5601` 
címeken lehet elérni. A program M1-es Mac-en lett tesztelve.

### Projekt struktúra és fájlok leírása
- `scripts` - A program futtatásához szükséges scriptek
- `esdata` - Az Elasticsearch adatbázis adatai, mely tartalmazza a Kibana adtait
- `cache` - A program által letöltött adatok
- `documentation.md` - A program dokumentációja
- `images` - A program dokumentációjában használt képek
- `package.json` - A program Node.js package.json fájlja
- `startes.sh` - Az Elasticsearch indításához szükséges script
- `startkibana.sh` - A Kibana indításához szükséges script
- `.eslintrc.json` - A program eslint konfigurációs fájlja
- `.prettierrc.json` - A program prettier konfigurációs fájlja
- `elasticsearch_dev_m1.yml` - Az Elasticsearch konfigurációs fájlja
- `constans.js` - A programban használt konstansok

## Dokumentáció
[Itt található](./documentation.md)
