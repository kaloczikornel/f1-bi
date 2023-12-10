const { YEARS } = require('../constants');
const fs = require('fs');
const axios = require('axios');
const { processRaces } = require('./helper');

/**
 * Function for extracting the race results from the Ergast API and saving them in the cache folder
 * The result format should be:
 * [
 *     {
 *         "season": 2008,
 *         "circuitName": "Albert Park Grand Prix Circuit",
 *         "circuitId": "albert_park",
 *         "driverId": "hamilton",
 *         "driverFullName": "Lewis Hamilton",
 *         "position": 1
 *     }
 *
 * ]
 */
const extractRaceResults = async () => {
    const limit = 100;
    const raceResults = [];
    for (const year of YEARS) {
        let offset = 0;
        while (true) {
            const url = `http://ergast.com/api/f1/${year}/results.json?limit=${limit}&offset=${offset}`;
            const { data } = await axios.get(url);
            const races = data.MRData.RaceTable.Races;
            if (races.length === 0) {
                break;
            }
            raceResults.push(...processRaces(races, year));
            offset += limit;
        }
    }
    // create folders if not exists
    for (const year of YEARS) {
        if (!fs.existsSync(`../cache/raceResults/${year}`)) {
            fs.mkdirSync(`../cache/raceResults/${year}`);
        }
    }
    let i = 0;
    // write to file
    for (const result of raceResults) {
        fs.writeFileSync(
            `../cache/raceResults/${result.season}/${i}.json`,
            JSON.stringify(result, null, 2)
        );
        i++;
    }
};
extractRaceResults().catch(console.log);
