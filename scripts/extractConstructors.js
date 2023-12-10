const { YEARS } = require('../constants');
const axios = require('axios');
const fs = require('fs');
const extractConstructors = async () => {
    const limit = 100;
    const constructors = [];
    for (const year of YEARS) {
        let offset = 0;
        while (true) {
            const url = `http://ergast.com/api/f1/${year}/constructors.json?limit=${limit}&offset=${offset}`;
            const { data } = await axios.get(url);
            const constructorData = data.MRData.ConstructorTable.Constructors;
            if (constructorData.length === 0) {
                break;
            }
            for (const constructor of constructorData) {
                const constructorId = constructor.constructorId;
                const constructorName = constructor.name;
                constructors.push({
                    constructorId,
                    constructorName,
                });
            }
            offset += limit;
        }
    }

    // create folders if not exists
    if (!fs.existsSync(`../cache/constructors`)) {
        fs.mkdirSync(`../cache/constructors`);
    }
    // write to file
    let i = 0;
    for (const constructor of new Set(constructors)) {
        fs.writeFileSync(
            `../cache/constructors/${constructor.constructorId}.json`,
            JSON.stringify(constructor, null, 2)
        );
        i++;
    }
};
extractConstructors().catch(console.log);
