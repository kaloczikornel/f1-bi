# F1 adatok elemzése
#### Vizsgált időszak 2008-2023

## Célok:
- időmérő helyezések összehasonlítása a verseny helyezésekkel
- előző éves győztes csapat helyezése a következő évben

### Adatszerzés:
- csapatok kinyerése
- pályák kinyerés
- versenyzők kinyerése
- időmérő helyezések kinyerése
- verseny helyezések kinyerése
- csapat pontok kinyerése

## Csapatok kinyerése
    
##### https://ergast.com/api/f1/{year}/constructors.json

#### Folyamat lépéseinek leírása:
- a vizsgált időszakhoz tartozó évek alapján lekérjük az összes csapatot
- a csapatokat egy listába tesszük, ahol kiszűrjük a duplikációkat

## Pályák kinyerése 
##### https://ergast.com/api/f1/{year}/circuits.json

#### Folyamat lépéseinek leírása:

- a vizsgált időszakhoz tartozó évek alapján lekérjük az összes pályát
- a pályákat egy listába tesszük, ahol kiszűrjük a duplikációkat

## Versenyzők kinyerése
##### https://ergast.com/api/f1/{year}/drivers.json
#### Folyamat lépéseinek leírása:

- a vizsgált időszakhoz tartozó évek alapján lekérjük az összes versenyzőt
- a versenyzőket egy listába tesszük, ahol kiszűrjük a duplikációkat

## Időmérő helyezések kinyerése
##### https://ergast.com/api/f1/{year}/qualifying.json
#### Folyamat lépéseinek leírása:

A vizsgált időszakhoz tartozó évek alapján lekérjük az összes időmérő helyezést 
majd kapott struktúrát transzformálni kell a következő formára:

```json
    [
        {
            "season": 2008,
            "circuitName": "Albert Park Grand Prix Circuit",
            "circuitId": "albert_park",
            "driverId": "hamilton",
            "driverFullName": "Lewis Hamilton",
            "position": 1
        }
    ]
```
Készíthető diagram a versenyzők helyezésének alakulásáról a következő módon:
- évek szerint csoportosítjuk a versenyzőket
    - x tengelyen az évek
    - y tengelyen az időmérő helyezések
- egy versenyző egy vonalat kapjon

## Verseny helyezések kinyerése
##### https://ergast.com/api/f1/{year}/results.json

#### Folyamat lépéseinek leírása:
A vizsgált időszakhoz tartozó évek alapján lekérjük az összes verseny helyezést, majd a kapott struktúrát transzformálni kell a következő formára:
```json
[
    {
        "season": 2008,
        "circuitName": "Albert Park Grand Prix Circuit",
        "circuitId": "albert_park",
        "driverId": "hamilton",
        "driverFullName": "Lewis Hamilton",
        "position": 1
    }
   
]
```
Készíthető diagram a versenyzők helyezésének alakulásáról a következő módon:
- évek szerint csoportosítjuk a versenyzőket
    - x tengelyen az évek
    - y tengelyen a helyezések
- egy versenyző egy vonalat kapjon
            
## Csapat pontok és helyezések kinyerése
##### https://ergast.com/api/f1/{year}/constructorStandings.json
#### Folyamat lépéseinek leírása:

A vizsgált időszakhoz tartozó évek alapján lekérjük az összes csapat pontot, majd kapott struktúrát transzformálni kell a következő formára:
```json           
 [
    {
        "season": 2008,
        "constructorId": "mclaren",
        "constructorName": "McLaren",
        "points": 151,
        "position": 2
    }
]
```
Készíthető diagram a csapatok pontjainak alakulásáról a következő módon
- évek szerint csoportosítjuk a csapatokat
    - x tengelyen az évek
    - y tengelyen a pontok
- egy csapat egy vonalat kapjon

## Előző éves győztes csapat helyezése a következő évben
#### Folyamat lépéseinek leírása:
A meglévő adatokból előállítunk egy olyan struktúrát, amiben szerepel a csapat neve, az év valamint az adott évi helyezése és az előző évben elért helyezése. 
###### 2008-tól jönnek az adatok, szóval 2007-es pontszám nem lesz, erre figyelni kell
```json
[
    {
        "season": 2009,
        "constructorId": "mclaren",
        "constructorName": "McLaren",
        "position": 2,
        "prevPosition": 1
    }
]
``` 
Készíthető diagram a csapatok helyezésének alakulásáról a következő módokon
- évek szerint csoportosítjuk a csapatokat
    - x tengelyen az évek
    - y tengelyen a helyezések
- ábrázoljuk az aktuális és az előző évben elért helyezéseket 
  - egy csapat egy vonalat kapjon
  - x tengelyen az aktuális év helyezése
  - y tengelyen az előző év helyezése

## Időmérő helyezések összehasonlítása a verseny helyezésekkel
#### Folyamat lépéseinek leírása:
A meglévő adatokból előállítunk egy olyan struktúrát, amiben szerepel a versenyző neve, az év valamint az adott 
versenyhez tartozó időmérő helyezése és maga a verseny helyezése.
```json
[
    {
        "season": 2008,
        "circuitName": "Albert Park Grand Prix Circuit",
        "circuitId": "albert_park",
        "driverId": "hamilton",
        "driverFullName": "Lewis Hamilton",
        "qualifyingPosition": 1,
        "racePosition": 1
    }
]
```
Készíthető diagram a versenyzők helyezésének alakulásáról a következő módon:
- évek szerint csoportosítjuk a versenyzőket
    - x tengelyen az évek
    - y tengelyen a helyezések
    - egy versenyző 2 vonalat kapjon, egy az időmérő helyezésekkel, egy pedig a verseny helyezésekkel
- ábrázoljuk az időmérő és a verseny helyezéseket
  - egy versenyző egy vonalat kapjon
  - x tengelyen az időmérő helyezés
  - y tengelyen a verseny helyezés
        