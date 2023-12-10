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