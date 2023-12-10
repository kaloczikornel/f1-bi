const axios = require('axios');
const fs = require('fs');
const { YEARS } = require('../constants');

const extractDrivers = async () => {
    const limit = 100;
    const drivers = [];
    for (const year of YEARS) {
        let offset = 0;
        while (true) {
            const url = `http://ergast.com/api/f1/${year}/drivers.json?limit=${limit}&offset=${offset}`;
            const { data } = await axios.get(url);
            const driverData = data.MRData.DriverTable.Drivers;
            if (driverData.length === 0) {
                break;
            }
            for (const driver of driverData) {
                const driverId = driver.driverId;
                const driverFullName =
                    driver.givenName + ' ' + driver.familyName;
                drivers.push({
                    driverId,
                    driverFullName,
                });
            }
            offset += limit;
        }
    }

    // create folders if not exists
    if (!fs.existsSync(`../cache/drivers`)) {
        fs.mkdirSync(`../cache/drivers`);
    }
    // write to file
    let i = 0;
    for (const driver of new Set(drivers)) {
        fs.writeFileSync(
            `../cache/drivers/${driver.driverId}.json`,
            JSON.stringify(driver, null, 2)
        );
        i++;
    }
};
extractDrivers().catch(console.log);
