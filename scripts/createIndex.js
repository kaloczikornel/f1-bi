const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');
const client = new Client({
    node: 'http://localhost:9200',
});

const createQualifyingResultsIndexAndLoadData = async () => {
    const directories = fs.readdirSync('../cache/qualifyingResults');
    const indexName = 'qualifying_results';

    try {
        await client.indices.delete({ index: indexName });
    } catch (e) {
        //dont care, probably index doesnt exist
    }

    await client.indices.create({
        index: indexName,
        body: {
            mappings: {
                properties: {
                    season: { type: 'integer' },
                    circuitName: { type: 'keyword' },
                    circuitId: { type: 'keyword' },
                    driverId: { type: 'keyword' },
                    driverFullName: { type: 'keyword' },
                    position: { type: 'integer' },
                },
            },
        },
    });

    const data = [];
    for (const directory of directories) {
        const files = fs.readdirSync(`../cache/qualifyingResults/${directory}`);
        for (const file of files) {
            const qualifyingResults = fs.readFileSync(
                `../cache/qualifyingResults/${directory}/${file}`,
                'utf-8'
            );
            const parsed = JSON.parse(qualifyingResults);
            data.push(parsed);
        }
    }
    const body = data.flatMap((doc) => [
        { index: { _index: indexName } },
        doc,
    ]);
    await client.bulk({ refresh: true, body });

    const count = await client.count({ index: indexName });
    console.log(count);
    console.log('Qualifying results loaded successfully!');
};

const createRaceResultsIndexAndLoadData = async () => {
    const directories = fs.readdirSync('../cache/raceResults');
    const indexName = 'race_results';

    try {
        await client.indices.delete({ index: indexName });
    } catch (e) {
        //dont care, probably index doesnt exist
    }

    await client.indices.create({
        index: indexName,
        body: {
            mappings: {
                properties: {
                    season: { type: 'integer' },
                    circuitName: { type: 'keyword' },
                    circuitId: { type: 'keyword' },
                    driverId: { type: 'keyword' },
                    driverFullName: { type: 'keyword' },
                    position: { type: 'integer' },
                },
            },
        },
    });

    const data = [];
    for (const directory of directories) {
        const files = fs.readdirSync(`../cache/raceResults/${directory}`);
        for (const file of files) {
            const raceResults = fs.readFileSync(
                `../cache/raceResults/${directory}/${file}`,
                'utf-8'
            );
            const parsed = JSON.parse(raceResults);
            data.push(parsed);
        }
    }
    const body = data.flatMap((doc) => [
        { index: { _index: indexName } },
        doc,
    ]);
    await client.bulk({ refresh: true, body });

    const count = await client.count({ index: indexName });
    console.log(count);
    console.log('Race results loaded successfully!');
};

const createConstructorStandingsIndexAndLoadData = async () => {
    const directories = fs.readdirSync('../cache/constructorStandings');
    const indexName = 'constructor_standings';

    try {
        await client.indices.delete({ index: indexName });
    } catch (e) {
        //dont care, probably index doesnt exist
    }

    await client.indices.create({
        index: indexName,
        body: {
            mappings: {
                properties: {
                    season: { type: 'integer' },
                    constructorId: { type: 'keyword' },
                    constructorName: { type: 'keyword' },
                    position: { type: 'integer' },
                    points: { type: 'long' },
                },
            },
        },
    });

    const data = [];
    for (const directory of directories) {
        const files = fs.readdirSync(
            `../cache/constructorStandings/${directory}`
        );
        for (const file of files) {
            const constructorStandings = fs.readFileSync(
                `../cache/constructorStandings/${directory}/${file}`,
                'utf-8'
            );
            const parsed = JSON.parse(constructorStandings);
            data.push(parsed);
        }
    }
    const body = data.flatMap((doc) => [
        { index: { _index: indexName } },
        doc,
    ]);
    await client.bulk({ refresh: true, body });

    const count = await client.count({ index: indexName });
    console.log(count);
    console.log('Constructor standings loaded successfully!');
};

/**
 * Function for creating every ElasticSearch indices and loading the data into them
 */
const createIndicesAndLoadData = async () => {
    await createQualifyingResultsIndexAndLoadData();
    await createRaceResultsIndexAndLoadData();
    await createConstructorStandingsIndexAndLoadData();
};
createIndicesAndLoadData().catch(console.log);
