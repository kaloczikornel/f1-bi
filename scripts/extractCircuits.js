const { get } = require('axios');
const { YEARS } = require('../constants');
const fs = require('fs');
const extractCircuits = async () => {
    const limit = 100;
    const circuits = [];
    for (const year of YEARS) {
        let offset = 0;
        while (true) {
            const url = `http://ergast.com/api/f1/${year}/circuits.json?limit=${limit}&offset=${offset}`;
            const { data } = await get(url);
            const circuitData = data.MRData.CircuitTable.Circuits;
            if (circuitData.length === 0) {
                break;
            }
            for (const circuit of circuitData) {
                const circuitId = circuit.circuitId;
                const circuitName = circuit.circuitName;
                circuits.push({
                    circuitId,
                    circuitName,
                });
            }
            offset += limit;
        }
    }
    // create folders if not exists
    if (!fs.existsSync(`../cache/circuits`)) {
        fs.mkdirSync(`../cache/circuits`);
    }
    // write to file
    let i = 0;
    for (const circuit of new Set(circuits)) {
        fs.writeFileSync(
            `../cache/circuits/${circuit.circuitId}.json`,
            JSON.stringify(circuit, null, 2)
        );
        i++;
    }
};
extractCircuits().catch(console.log);
