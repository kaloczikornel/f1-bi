module.exports.processRaces = (races, year) => {
    const raceResults = [];
    for (const race of races) {
        const circuitId = race.Circuit.circuitId;
        const circuitName = race.Circuit.circuitName;
        const results = race.Results ? race.Results : race.QualifyingResults;
        for (const result of results) {
            const driverId = result.Driver.driverId;
            const driverFullName = `${result.Driver.givenName} ${result.Driver.familyName}`;
            const position = result.position;
            raceResults.push({
                season: year,
                circuitName,
                circuitId,
                driverId,
                driverFullName,
                position,
            });
        }
    }
    return raceResults;
};
