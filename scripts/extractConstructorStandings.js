const { YEARS } = require('../constants');
const fs = require('fs');
const axios = require('axios');

/**
 * Function for extracting the constructor standings from the Ergast API and saving them in the cache folder
 * The result format should be:
 * [
 *     {
 *         "season": 2008,
 *         "constructorId": "mclaren",
 *         "constructorName": "McLaren",
 *         "points": 151,
 *         "position": 2
 *     }
 * ]
 */
const extractConstructorStandings = async () => {
    const limit = 100;
    const constructorStandings = [];
    for (const year of YEARS) {
        let offset = 0;
        while (true) {
            const url = `http://ergast.com/api/f1/${year}/constructorStandings.json?limit=${limit}&offset=${offset}`;
            const { data } = await axios.get(url);
            const standings = data.MRData.StandingsTable.StandingsLists;
            if (standings.length === 0) {
                break;
            }
            const ctrStandings = standings[0].ConstructorStandings;
            for (const standing of ctrStandings) {
                const constructorId = standing.Constructor.constructorId;
                const constructorName = standing.Constructor.name;
                const points = standing.points;
                const position = standing.position;
                constructorStandings.push({
                    season: year,
                    constructorId,
                    constructorName,
                    points,
                    position,
                });
            }
            offset += limit;
        }
    }
    // create folders if not exists
    for (const year of YEARS) {
        if (!fs.existsSync(`../cache/constructorStandings/${year}`)) {
            fs.mkdirSync(`../cache/constructorStandings/${year}`);
        }
    }
    // write to file
    let i = 0;
    for (const result of constructorStandings) {
        fs.writeFileSync(
            `../cache/constructorStandings/${result.season}/${i}.json`,
            JSON.stringify(result, null, 2)
        );
        i++;
    }
}
extractConstructorStandings().catch(console.log);